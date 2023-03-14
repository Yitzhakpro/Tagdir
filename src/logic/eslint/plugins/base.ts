import type { EslintRule } from "./types";

export class EslintPlugin {
  private packageName: string;
  private rules?: EslintRule;
  private sharedConfigName?: string;
  private configurationPackageName?: string;

  constructor(
    packageName: string,
    rules?: EslintRule,
    sharedConfigName?: string,
    configurationPackageName?: string
  ) {
    this.packageName = packageName;
    this.rules = rules;
    this.sharedConfigName = sharedConfigName;
    this.configurationPackageName = configurationPackageName;
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

  public getExtend(): string | null {
    if (this.configurationPackageName) {
      const splitedConfigurationPackageName =
        this.configurationPackageName.split("eslint-config-");

      return splitedConfigurationPackageName[1];
    } else if (this.sharedConfigName) {
      return `plugin:${this.getPluginName()}/${this.sharedConfigName}`;
    }

    return null;
  }

  public getRules(): EslintRule | undefined {
    return this.rules;
  }

  public getNeededPackages(): string[] {
    const packages: string[] = [];

    packages.push(this.packageName);
    if (this.configurationPackageName) {
      packages.push(this.configurationPackageName);
    }

    return packages;
  }
}
