import fs from "fs";
import path from "path";
import {
  addScriptToPackageJson,
  getConfirmation,
  getInstallCommand,
  isPackageInstalled,
  Logger,
  runCommand,
} from "../utils";
import type { PackageManager } from "../types";
import type { BaseHelper } from "./base";

class Prettier implements BaseHelper {
  private static async installPrettier(
    packageManager: PackageManager
  ): Promise<void> {
    try {
      const prettierInstallCommand = getInstallCommand(
        packageManager,
        "prettier",
        true
      );
      const shouldAutoInstall = await getConfirmation(
        "auto-install-prettier",
        "Do you want the CLI to install it for you?"
      );
      if (shouldAutoInstall) {
        Logger.info("Installing prettier...");
        await runCommand(prettierInstallCommand);
        Logger.success("Installed prettier successfully!");
      } else {
        Logger.info(
          `Here is the command for manual installation: ${prettierInstallCommand}`
        );
      }
    } catch (error) {
      Logger.error("Failed to install prettier");
      console.error(error);
      process.exit(1);
    }
  }

  // TODO: add configuration according to project
  private static createPrettierConfiguration(): void {
    const prettierrcTemplateLocation = path.join(
      __dirname,
      "..",
      "..",
      "templates",
      "prettier",
      ".prettierrc"
    );
    const destinationPath = path.join(process.cwd(), ".prettierrc");

    fs.copyFileSync(prettierrcTemplateLocation, destinationPath);

    Logger.success("Created default .prettierrc configuration file.");
    Logger.info(
      "You can modify the config file according to your needs, for more info: https://prettier.io/docs/en/options.html"
    );
  }

  private static createPrettierIgnoreConfiguration(): void {
    const prettierrcIgnoreTemplateLocation = path.join(
      __dirname,
      "..",
      "..",
      "templates",
      "prettier",
      ".prettierignore"
    );
    const destinationPath = path.join(process.cwd(), ".prettierignore");

    fs.copyFileSync(prettierrcIgnoreTemplateLocation, destinationPath);

    Logger.success("Created default .prettierignore configuration file.");
    Logger.info(
      "You can modify the ignore file according to your needs, for more info: https://prettier.io/docs/en/ignore.html"
    );
  }

  private static addPrettierScripts(): void {
    addScriptToPackageJson("prettier:check", "npx prettier src/* --check");
    addScriptToPackageJson("prettier:fix", "npx prettier src/* --write");

    Logger.success("Added default prettier scripts to package.json");
    Logger.info(
      "You can modify the scripts according to your needs, for more info: https://prettier.io/docs/en/cli.html"
    );
  }

  public async apply(packageManager: PackageManager): Promise<void> {
    if (!isPackageInstalled("prettier")) {
      await Prettier.installPrettier(packageManager);
      Prettier.createPrettierConfiguration();
      Prettier.createPrettierIgnoreConfiguration();
      Prettier.addPrettierScripts();
    } else {
      Logger.warn("Prettier is already installed, skipping.");
    }
  }
}

export default Prettier;
