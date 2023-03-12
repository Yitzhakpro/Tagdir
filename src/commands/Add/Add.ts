import { Command, Argument } from "commander";
import { CONFIGURATIONS_ORDER } from "../../logic";
import { getPackageManagerName } from "../../utils";
import { CONFIGURATIONS } from "./constants";
import type { Configuration, HelperConfig } from "../../types";

class Add {
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

    CONFIGURATIONS_ORDER.forEach(async (configOrder) => {
      if (configurations.includes(configOrder.name)) {
        await configOrder.apply(helperConfig);
      }
    });
  }
}

export default new Add();
