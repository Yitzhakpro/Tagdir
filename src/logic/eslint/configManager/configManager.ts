import fs from "fs";
import path from "path";
import {
  convertConfigToJson,
  convertJsonToConfig,
  getExistingFileExtension,
  getInstallCommand,
  runCommand,
} from "../../../utils";
import { ESLINT_CONFIG_EXTENSION } from "../../../constants";
import type { PackageManager } from "../../../types";
import type { EslintPlugin, EslintRule } from "../plugins";

class EslintConfigManager {
  private packageManager: PackageManager;

  constructor(packageManager: PackageManager) {
    this.packageManager = packageManager;
  }

  private addToExtends(config: Record<string, any>, pluginExtend: string) {
    if (!config.extends) {
      config.extends = [];
    } else if (
      typeof config.extends === "string" ||
      config.extends instanceof String
    ) {
      config.extends = [config.extends];
    }

    config.extends.push(pluginExtend);
  }

  private addToPlugins(config: Record<string, any>, pluginName: string) {
    if (!config.plugins) {
      config.plugins = [];
    }

    config.plugins.push(pluginName);
  }

  private addToRules(config: Record<string, any>, pluginRules: EslintRule) {
    if (!config.rules) {
      config.rules = {};
    }

    config.rules = { ...config.rules, ...pluginRules };
  }

  // TODO: think of better way to pass packageManager
  public async addPlugins(...plugins: EslintPlugin[]): Promise<void> {
    const configExtension = getExistingFileExtension(
      ".eslintrc",
      ESLINT_CONFIG_EXTENSION,
      process.cwd()
    );
    const eslintConfigPath = path.join(
      process.cwd(),
      `.eslintrc.${configExtension}`
    );
    const config = await convertConfigToJson(eslintConfigPath, configExtension);

    const sortedPlugins = plugins.sort(
      (pluginA, pluginB) =>
        pluginA.getConfigurationPriority() - pluginB.getConfigurationPriority()
    );
    for (const plugin of sortedPlugins) {
      const pluginInstallations = plugin.getNeededPackages();
      const pluginName = plugin.getPluginName();
      const pluginExtend = plugin.getExtend();
      const pluginRules = plugin.getRules();

      // installing the plugin
      const pluginInstallCommand = getInstallCommand(
        this.packageManager,
        pluginInstallations.join(" "),
        true
      );
      await runCommand(pluginInstallCommand);

      this.addToPlugins(config, pluginName);
      if (pluginExtend) {
        this.addToExtends(config, pluginExtend);
      }
      if (pluginRules) {
        this.addToRules(config, pluginRules);
      }
    }

    const configStr = convertJsonToConfig(config, configExtension);
    fs.writeFileSync(eslintConfigPath, configStr);
  }
}

export default EslintConfigManager;
