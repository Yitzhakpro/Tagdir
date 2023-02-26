import { promisify } from "util";
import { exec as execCallback } from "child_process";
import { getPackageManagerName, Prompt } from "../utils";
import type { InstallMapping } from "../types";

const exec = promisify(execCallback);

class Husky {
  // TODO: think later about create project from scratch use case
  private static async installHusky(): Promise<void> {
    try {
      const packageManager = await getPackageManagerName();

      // ?: maybe add question if you want to install for yourself
      const huskyInstallMapping: InstallMapping = {
        npm: "npx husky-init && npm install",
        yarn1: "npx husky-init && yarn",
        yarn2: "yarn dlx husky-init --yarn2 && yarn",
        pnpm: "pnpm dlx husky-init && pnpm install",
      };

      const { stderr, stdout } = await exec(
        huskyInstallMapping[packageManager]
      );

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    } catch (error) {
      console.error(`exec error: ${error}`);
      throw new Error("Failed to install husky");
    }
  }

  private static async installLintStaged(): Promise<void> {
    try {
      const packageManager = await getPackageManagerName();

      // ?: maybe add question if you want to install for yourself
      const lintStagedInstallMapping: InstallMapping = {
        npm: "npm install --save-dev lint-staged",
        yarn1: "yarn add -D lint-staged",
        yarn2: "yarn add -D lint-staged",
        pnpm: "pnpm add -D lint-staged",
      };

      const { stderr, stdout } = await exec(
        lintStagedInstallMapping[packageManager]
      );

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    } catch (error) {
      console.error(`exec error: ${error}`);
      throw new Error("Failed to install lint staged");
    }
  }

  public static async install(): Promise<void> {
    await this.installHusky();

    const shouldInstallLintStaged = await Prompt.getConfirmation(
      "install",
      "Do you want to install lint staged? (usually going along with husky)"
    );

    if (shouldInstallLintStaged) {
      await this.installLintStaged();
    }
  }
}

export default Husky;
