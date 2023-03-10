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
    // TODO: implement
    // check if @scope or just eslint-plugin-[plugin-name]
    return "";
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
