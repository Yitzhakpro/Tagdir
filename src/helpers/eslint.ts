import fs from "fs";
import path from "path";
import {
  addScriptToPackageJson,
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

  private static createEslintIgnoreConfiguration(): void {
    // TODO: create generic function for copy template files to use later in all helpers.
    const eslintIgnoreTemplateLocation = path.join(
      __dirname,
      "..",
      "..",
      "templates",
      "eslint",
      ".eslintignore"
    );
    const destinationPath = path.join(process.cwd(), ".eslintignore");

    fs.copyFileSync(eslintIgnoreTemplateLocation, destinationPath);

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
      Eslint.createEslintIgnoreConfiguration();
      Eslint.addEslintScripts();
    } else {
      Logger.warn("Eslint is already installed, skipping.");
    }
  }
}

export default Eslint;
