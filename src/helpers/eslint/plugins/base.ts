export class EslintPlugin {
  private name: string;
  private packageName: string;
  private builtInConfigName?: string;

  constructor(name: string, packageName: string, builtInConfigName?: string) {
    this.name = name;
    this.packageName = packageName;
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

  public getRules(): string {
    // TODO: implement
    return "";
  }
}
