import fs from "fs";
import path from "path";
import { Logger, getInstallCommand, getInstallAllDepsCommand } from "../utils";
import {
  copyTemplateFiles,
  isPackageInstalled,
  getConfirmation,
  getPackageRunnerCommand,
  runCommand,
} from "../utils";
import type { HelperConfig, PackageManager } from "../types";
import type { BaseHelper } from "./base";

class Husky implements BaseHelper {
  private static async installHusky(
    packageManager: PackageManager
  ): Promise<void> {
    try {
      Logger.info("Initializing husky...");
      const huskyPackageName =
        packageManager === "yarn2" ? "husky-init --yarn2" : "husky-init";
      const huskyInitRunnerCommand = getPackageRunnerCommand(
        packageManager,
        huskyPackageName
      );
      await runCommand(huskyInitRunnerCommand);
      Logger.success("Initialized husky successfully!");

      const huskyInstallCommand = getInstallAllDepsCommand(packageManager);
      const shouldAutoInstall = await getConfirmation(
        "auto-install-husky",
        "Do you want the CLI to install husky for you?"
      );
      if (shouldAutoInstall) {
        Logger.info("Installing lint-staged...");
        await runCommand(huskyInstallCommand);
        Logger.success("Installed husky successfully!");
      } else {
        Logger.info(
          `For manual installation just type: ${huskyInstallCommand}`
        );
      }
    } catch (error) {
      Logger.error("Failed to install husky");
      console.error(error);
      process.exit(1);
    }
  }

  private static async installLintStaged(
    packageManager: PackageManager
  ): Promise<void> {
    try {
      const lintStagedInstallCommand = getInstallCommand(
        packageManager,
        "lint-staged",
        true
      );
      const shouldAutoInstall = await getConfirmation(
        "auto-install-lint-staged",
        "Do you want the CLI to install lint-staged for you?"
      );
      if (shouldAutoInstall) {
        Logger.info("Installing lint-staged...");
        await runCommand(lintStagedInstallCommand);
        Logger.success("Installed lint-staged successfully!");
      } else {
        Logger.info(
          `Here is the command for manual installation: ${lintStagedInstallCommand}`
        );
      }
    } catch (error) {
      Logger.error("Failed to install lint-staged");
      console.error(error);
      process.exit(1);
    }
  }

  private static createLintStagedConfiguration(): void {
    copyTemplateFiles("lintStaged", process.cwd());

    // modifing .pre-commit husky file to npx lint-staged
    const preCommitHuskyLocation = path.join(
      process.cwd(),
      ".husky",
      "pre-commit"
    );
    const preCommitHusky = fs.readFileSync(preCommitHuskyLocation).toString();
    const modifiedPreCommit = preCommitHusky.replace(
      /npm.*/,
      "npx lint-staged"
    );
    fs.writeFileSync(preCommitHuskyLocation, modifiedPreCommit);

    Logger.success(
      "Created default .lintstagedrc configuration file and changed default husky pre-commit file"
    );
    Logger.info(
      "You can modify the config file according to your needs, for more info: https://www.npmjs.com/package/lint-staged"
    );
  }

  public async apply(config: HelperConfig): Promise<void> {
    const { packageManager } = config;

    if (!isPackageInstalled("husky")) {
      await Husky.installHusky(packageManager);
    } else {
      Logger.warn("Husky is already installed, skipping.");
    }

    const shouldInstallLintStaged = await getConfirmation(
      "install",
      "Do you want to add lint-staged? (usually going along with husky)"
    );

    if (shouldInstallLintStaged) {
      if (!isPackageInstalled("lint-staged")) {
        await Husky.installLintStaged(packageManager);
        Husky.createLintStagedConfiguration();
      } else {
        Logger.warn("Lint-staged is already installed, skipping.");
      }
    }
  }
}

export default Husky;
