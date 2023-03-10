import fs from "fs";
import path from "path";
import {
  addScriptToPackageJson,
  copyTemplateFiles,
  isPackageInstalled,
  Logger,
  runCommand,
} from "../utils";
import type { HelperConfig } from "../types";
import type { BaseHelper } from "./base";

class Eslint implements BaseHelper {
  private static async initEslint(): Promise<void> {
    try {
      Logger.info("Initializing eslint...");

      const eslintInitCommand = "npm init @eslint/config";
      // TODO: capture deps if didn't auto install, from stdout
      await runCommand(eslintInitCommand, true, {
        stdio: ["inherit", "inherit", "inherit"],
      });

      Logger.success("Initialized eslint successfully!");
    } catch (error) {
      Logger.error("Failed to init eslint");
      console.error(error);
      process.exit(1);
    }
  }

  private static createEslintConfigurations(): void {
    copyTemplateFiles("eslint", process.cwd());

    Logger.success("Created default .eslintignore configuration file.");
    Logger.info(
      "You can modify the ignore file according to your needs, for more info: https://eslint.org/docs/latest/use/configure/ignore"
    );
  }

  private static addEslintScripts(): void {
    addScriptToPackageJson("lint:check", "npx eslint src/*");
    addScriptToPackageJson("lint:fix", "npx eslint src/* --fix");

    Logger.success("Added default eslint scripts to package.json");
    Logger.info(
      "You can modify the scripts according to your needs, for more info: https://eslint.org/docs/latest/use/command-line-interface"
    );
  }

  public async apply(_config: HelperConfig): Promise<void> {
    if (!isPackageInstalled("eslint")) {
      await Eslint.initEslint();
      Eslint.createEslintConfigurations();
      Eslint.addEslintScripts();
    } else {
      Logger.warn("Eslint is already installed, skipping.");
    }
  }
}

export default Eslint;
