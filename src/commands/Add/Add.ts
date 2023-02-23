import { Command, Argument } from "commander";
import type { Configuration } from "./types";

class AddCommand {
  public command: Command;

  constructor() {
    const command = new Command("add")
      .description("add new configuration to existing project")
      .addArgument(
        new Argument("<configurations...>", "space seperated values").choices([
          "husky",
          "eslint",
          "prettier",
        ])
      )
      .action((configurations: Configuration[]) => {
        this.handler(configurations);
      });

    this.command = command;
  }

  private handler(configurations: Configuration[]) {
    console.log(configurations);
  }
}

export default new AddCommand();
