import { Command } from "commander";
import { Add } from "./commands";

export default class Program {
  private program: Command;

  constructor() {
    const program = new Command()
      .name("Enhancer")
      .description("CLI to add configurations to project")
      .addCommand(Add.command);

    this.program = program;
  }

  public parse(argv?: NodeJS.Process["argv"]): void {
    this.program.parse(argv);
  }
}
