import fs from "fs";
import path from "path";
import { isPackageInstalled, Logger, runCommand } from "../utils";

class Eslint {
  private static async initEslint(): Promise<void> {
    try {
      Logger.info("Initializing eslint...");

      const eslintInitCommand = "npm init @eslint/config";
      // TODO: capture deps if didn't auto install, from stdout
      await runCommand(eslintInitCommand, true, {
        stdio: ["inherit", "inherit", "inherit"],
      });

      Logger.success("Initialized eslint successfully!");
    } catch (error) {
      Logger.error("Failed to init eslint");
      console.error(error);
      process.exit(1);
    }
  }

  private static createEslintIgnoreConfiguration(): void {
    const eslintIgnoreTemplateLocation = path.join(
      __dirname,
      "..",
      "..",
      "templates",
      "eslint",
      ".eslintignore"
    );
    const destinationPath = path.join(process.cwd(), ".eslintignore");

    fs.copyFileSync(eslintIgnoreTemplateLocation, destinationPath);

    Logger.success("Created default .eslintignore configuration file.");
    Logger.info(
      "You can modify the ignore file according to your needs, for more info: https://eslint.org/docs/latest/use/configure/ignore"
    );
  }

  public static async install(): Promise<void> {
    if (!isPackageInstalled("eslint")) {
      await this.initEslint();
      this.createEslintIgnoreConfiguration();
    } else {
      Logger.warn("Eslint is already installed, skipping.");
    }
  }
}

export default Eslint;
