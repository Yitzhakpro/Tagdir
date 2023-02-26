import { exec } from "child_process";
import { getPackageManagerName } from "../utils";
import type { InstallMapping } from "../types";

class Husky {
  // TODO: think later about create project from scratch use case
  private static async installHusky(): Promise<void> {
    const packageManager = await getPackageManagerName();

    // ?: maybe add question if you want to install for yourself
    const huskyInstallMapping: InstallMapping = {
      npm: "npx husky-init && npm install",
      yarn1: "npx husky-init && yarn",
      yarn2: "yarn dlx husky-init --yarn2 && yarn",
      pnpm: "pnpm dlx husky-init && pnpm install",
    };

    exec(huskyInstallMapping[packageManager], (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        throw new Error("Failed to install husky");
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }

  public static async install(): Promise<void> {
    await this.installHusky();
  }
}

export default Husky;
