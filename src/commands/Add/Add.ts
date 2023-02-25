import { Command, Argument } from "commander";
import { CONFIGURATIONS } from "./constants";
import type { Configuration } from "./types";

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

  private handler(configurations: Configuration[]): void {
    configurations.forEach((configuration) => {
      console.log(configuration);
    });
  }
}

export default new AddCommand();
