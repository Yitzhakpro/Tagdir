import path from "path";
import { convertConfigToJson, getExistingFileExtension } from "../../../utils";
import { ESLINT_CONFIG_EXTENSION } from "./constants";
import type { ConfigExtensions } from "../../../types";
import type { EslintPlugin } from "../plugins";

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

  private addToExtends() {}

  private addToPlugins() {}

  private addToRules() {}

  public async addPlugins(...plugins: EslintPlugin[]): Promise<void> {
    const config = await convertConfigToJson(
      this.eslintConfigPath,
      this.configExtension
    );

    for (const plugin of plugins) {
      //
    }
  }
}

export default EslintConfigParser;
