import fs from "fs";
import path from "path";
import {
  convertConfigToJson,
  convertJsonToConfig,
  getExistingFileExtension,
  getInstallCommand,
  runCommand,
} from "../../../utils";
import { ESLINT_CONFIG_EXTENSION } from "./constants";
import type { ConfigExtensions, PackageManager } from "../../../types";
import type { EslintPlugin, EslintRule } from "../plugins";

class EslintConfigManager {
  private packageManager: PackageManager;
  private eslintConfigPath: string;
  private configExtension: ConfigExtensions;

  constructor(packageManager: PackageManager) {
    this.packageManager = packageManager;
    this.configExtension = getExistingFileExtension(
      ".eslintrc",
      ESLINT_CONFIG_EXTENSION,
      process.cwd()
    );
    this.eslintConfigPath = path.join(
      process.cwd(),
      `.eslintrc.${this.configExtension}`
    );
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
    const config = await convertConfigToJson(
      this.eslintConfigPath,
      this.configExtension
    );

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

    const configStr = convertJsonToConfig(config, this.configExtension);
    fs.writeFileSync(this.eslintConfigPath, configStr);
  }
}

export default EslintConfigManager;
