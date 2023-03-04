import fs from "fs";
import path from "path";
import {
  getConfirmation,
  getInstallCommand,
  isPackageInstalled,
  Logger,
  runCommand,
} from "../utils";
import type { PackageManager } from "../types";

class Prettier {
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

  public static async install(packageManager: PackageManager): Promise<void> {
    if (!isPackageInstalled("prettier")) {
      await this.installPrettier(packageManager);
      this.createPrettierConfiguration();
      this.createPrettierIgnoreConfiguration();
    } else {
      Logger.warn("Prettier is already installed, skipping.");
    }
  }
}

export default Prettier;
