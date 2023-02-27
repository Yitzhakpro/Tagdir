import fs from "fs";
import path from "path";
import Logger from "../logger";
import { getPackageManagerName, Prompt, runCommand } from "../utils";
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
      // TODO: figure out if we want to stop the process or not
      throw new Error("Failed to install husky");
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
      // TODO: figure out if we want to stop the process or not
      throw new Error("Failed to install lint staged");
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

    // ?: figure out if we want to change husky config file to use lint staged
    Logger.success("Created default .lintstagedrc configuration file");
    Logger.info(
      "You can modify the config file according to your needs, for more info: https://www.npmjs.com/package/lint-staged"
    );
  }

  // TODO: add logs about what should they add, etc...
  public static async install(): Promise<void> {
    await this.installHusky();

    const shouldInstallLintStaged = await Prompt.getConfirmation(
      "install",
      "Do you want to install lint staged? (usually going along with husky)"
    );

    if (shouldInstallLintStaged) {
      await this.installLintStaged();
      this.createLintStagedConfiguration();
    }
  }
}

export default Husky;
