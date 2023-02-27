import fs from "fs";
import path from "path";
import { Logger } from "../utils";
import {
  isPackageInstalled,
  getConfirmation,
  getPackageManagerName,
  runCommand,
} from "../utils";
import type { InstallMapping } from "../types";

class Husky {
  // TODO: think later about create project from scratch use case
  private static async installHusky(): Promise<void> {
    Logger.info("Installing husky...");

    try {
      const packageManager = await getPackageManagerName();

      // ?: maybe add question if you want to install for yourself
      const huskyInstallMapping: InstallMapping = {
        npm: "npx husky-init && npm install",
        yarn1: "npx husky-init && yarn",
        yarn2: "yarn dlx husky-init --yarn2 && yarn",
        pnpm: "pnpm dlx husky-init && pnpm install",
      };

      await runCommand(huskyInstallMapping[packageManager]);
      Logger.success("Installed husky successfully!");
    } catch (error) {
      Logger.error("Failed to install husky");
      console.error(error);
      process.exit(1);
    }
  }

  private static async installLintStaged(): Promise<void> {
    Logger.info("Installing lint-staged...");

    try {
      const packageManager = await getPackageManagerName();

      // ?: maybe add question if you want to install for yourself
      const lintStagedInstallMapping: InstallMapping = {
        npm: "npm install --save-dev lint-staged",
        yarn1: "yarn add -D lint-staged",
        yarn2: "yarn add -D lint-staged",
        pnpm: "pnpm add -D lint-staged",
      };

      await runCommand(lintStagedInstallMapping[packageManager]);
      Logger.success("Installed lint-staged successfully!");
    } catch (error) {
      Logger.error("Failed to install lint-staged");
      console.error(error);
      process.exit(1);
    }
  }

  private static createLintStagedConfiguration(): void {
    const basicLintStagedConfiguration = {
      "*": "npm run test",
    };
    const destinationPath = path.join(process.cwd(), ".lintstagedrc");

    fs.writeFileSync(
      destinationPath,
      JSON.stringify(basicLintStagedConfiguration, undefined, 4)
    );

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

  public static async install(): Promise<void> {
    if (!isPackageInstalled("husky")) {
      await this.installHusky();
    } else {
      Logger.warn("Husky is already installed, skipping.");
    }

    const shouldInstallLintStaged = await getConfirmation(
      "install",
      "Do you want to install lint-staged? (usually going along with husky)"
    );

    if (shouldInstallLintStaged) {
      if (!isPackageInstalled("lint-staged")) {
        await this.installLintStaged();
        this.createLintStagedConfiguration();
      } else {
        Logger.warn("Lint-staged is already installed, skipping.");
      }
    }
  }
}

export default Husky;
