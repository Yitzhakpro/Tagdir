import path from "path";
import { getExistingFileExtension } from "../../../utils";
import { ESLINT_CONFIG_EXTENSION } from "./constants";
import type { EslintPlugin } from "../plugins";
import type { EslintConfigExtensions } from "./types";

class EslintConfigParser {
  private eslintConfigPath: string;
  private configExtension: EslintConfigExtensions;

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

  public addPlugins(...plugins: EslintPlugin[]): void {}
}

export default EslintConfigParser;
