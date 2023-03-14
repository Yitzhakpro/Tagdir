import path from "path";
import { convertConfigToJson, getExistingFileExtension } from "../../../utils";
import { ESLINT_CONFIG_EXTENSION } from "./constants";
import type { ConfigExtensions } from "../../../types";
import type { EslintPlugin, EslintRule } from "../plugins";

class EslintConfigParser {
  private eslintConfigPath: string;
  private configExtension: ConfigExtensions;

  constructor() {
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

  // TODO: think about implementation
  private addToExtends(config: Record<string, unknown>, pluginExtend: string) {}

  // TODO: think about implementation
  private addToPlugins(config: Record<string, unknown>, pluginName: string) {}

  private addToRules(config: Record<string, any>, pluginRules: EslintRule) {
    if (!config.rules) {
      config.rules = {};
    }

    config.rules = { ...config.rules, ...pluginRules };
  }

  public async addPlugins(...plugins: EslintPlugin[]): Promise<void> {
    const config = await convertConfigToJson(
      this.eslintConfigPath,
      this.configExtension
    );

    for (const plugin of plugins) {
      const pluginName = plugin.getPluginName();
      const pluginExtend = plugin.getExtend();
      const pluginRules = plugin.getRules();

      this.addToPlugins(config, pluginName);
      if (pluginExtend) {
        this.addToExtends(config, pluginExtend);
      }
      if (pluginRules) {
        this.addToRules(config, pluginRules);
      }
    }

    console.log(config);
  }
}

export default EslintConfigParser;
