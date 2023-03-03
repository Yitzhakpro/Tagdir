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
    const basicPrettierConfiguration = {};
    const destinationPath = path.join(process.cwd(), ".prettierrc");

    fs.writeFileSync(
      destinationPath,
      JSON.stringify(basicPrettierConfiguration, undefined, 4)
    );

    Logger.success("Created default .prettierrc configuration file.");
    Logger.info(
      "You can modify the config file according to your needs, for more info: https://prettier.io/docs/en/options.html"
    );
  }

    private static createPrettierIgnoreConfiguration(): void {
        
    }

  public static async install(packageManager: PackageManager): Promise<void> {
    if (!isPackageInstalled("prettier")) {
      await this.installPrettier(packageManager);
    } else {
      Logger.warn("Prettier is already installed, skipping.");
    }
  }
}

export default Prettier;
