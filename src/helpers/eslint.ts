import { isPackageInstalled, Logger, runCommand } from "../utils";

class Eslint {
  private static async initEslint(): Promise<void> {
    try {
      const eslintInitCommand = "npm init @eslint/config";

      // TODO: capture deps if didn't auto install, from stdout
      await runCommand(eslintInitCommand, true, {
        stdio: ["inherit", "inherit", "inherit"],
      });
    } catch (error) {
      Logger.error("Failed to init eslint");
      console.error(error);
      process.exit(1);
    }
  }

  public static async install(): Promise<void> {
    if (!isPackageInstalled("eslint")) {
      await this.initEslint();
    } else {
      Logger.warn("Eslint is already installed, skipping.");
    }
  }
}

export default Eslint;
