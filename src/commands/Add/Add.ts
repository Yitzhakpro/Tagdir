import { Command, Argument } from "commander";
import { Eslint, Husky, Prettier } from "../../helpers";
import { getPackageManagerName } from "../../utils";
import { CONFIGURATIONS } from "./constants";
import type { HelperConfig } from "../../types";
import type { Configuration } from "./types";

// TODO: change to Add instead of AddCommand
class AddCommand {
  public command: Command;

  constructor() {
    const addCommand = new Command("add")
      .summary("add a configuration to existing project")
      .description(
        "Add new configuration to existing project, you may include multiple configurations, using seperated values (with space or ', ')."
      )
      .addArgument(
        new Argument("<configurations...>", "Configuration name(s).").choices(
          CONFIGURATIONS
        )
      )
      .action((configurations: Configuration[]) => {
        this.handler(configurations);
      });

    this.command = addCommand;
  }

  private async handler(configurations: Configuration[]): Promise<void> {
    const packageManager = await getPackageManagerName();
    const helperConfig: HelperConfig = { packageManager };

    // if (configurations.includes("eslint")) {
    //   await new Eslint.apply();
    // }

    // if (configurations.includes("prettier")) {
    //   await Prettier.install(packageManager);
    // }

    // if (configurations.includes("husky")) {
    //   await Husky.install(packageManager);
    // }
  }
}

export default new AddCommand();
