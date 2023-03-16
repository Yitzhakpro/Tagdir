import {
  addScriptToPackageJson,
  copyTemplateFiles,
  getConfirmation,
  getInstallCommand,
  isEslintInstalled,
  isPackageInstalled,
  Logger,
  runCommand,
} from "../utils";
import { PrettierPlugin } from "./eslint/plugins";
import type { HelperConfig, PackageManager } from "../types";
import type { BaseHelper } from "./base";
import type { EslintConfigManager } from "./eslint";

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
  private static createPrettierConfigurations(): void {
    copyTemplateFiles("eslint", process.cwd());

    Logger.success("Created default .prettierrc configuration file.");
    Logger.info(
      "You can modify the config file according to your needs, for more info: https://prettier.io/docs/en/options.html"
    );
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

  private static async addPrettierEslintPlugin(
    eslintConfigManager: EslintConfigManager
  ): Promise<void> {
    try {
      Logger.info("Installing prettier eslint plugin...");
      await eslintConfigManager.addPlugins(new PrettierPlugin());
      Logger.success("Successfully installed prettier eslint plugin!");
    } catch (error) {
      Logger.error("Failed to install prettier eslint plugin");
      console.error(error);
      process.exit(1);
    }
  }

  public async apply(config: HelperConfig): Promise<void> {
    if (!isPackageInstalled("prettier")) {
      const { packageManager, eslintConfigManager } = config;

      await Prettier.installPrettier(packageManager);
      Prettier.createPrettierConfigurations();
      Prettier.addPrettierScripts();

      if (isEslintInstalled()) {
        await Prettier.addPrettierEslintPlugin(eslintConfigManager);
      }
    } else {
      Logger.warn("Prettier is already installed, skipping.");
    }
  }
}

export default Prettier;