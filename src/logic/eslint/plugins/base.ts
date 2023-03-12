import type { EslintRule } from "./types";

export class EslintPlugin {
  private packageName: string;
  private rules?: EslintRule;
  private builtInConfigName?: string;

  constructor(
    packageName: string,
    rules?: EslintRule,
    builtInConfigName?: string
  ) {
    this.packageName = packageName;
    this.rules = rules;
    this.builtInConfigName = builtInConfigName;
  }

  public getPluginName(): string {
    if (this.packageName.startsWith("@")) {
      const slashIndex = this.packageName.indexOf("/");
      const pluginName = this.packageName.substring(0, slashIndex);

      return pluginName;
    }

    const splitedEslintPluginName = this.packageName.split("eslint-plugin-");
    return splitedEslintPluginName[1];
  }

  public getExtend(configExtensionName?: string): string {
    if (configExtensionName) {
      return `plugin:${this.getPluginName()}/${configExtensionName}`;
    } else if (this.builtInConfigName) {
      return this.builtInConfigName;
    }

    return "";
  }

  public getRules(): EslintRule | undefined {
    return this.rules;
  }
}
