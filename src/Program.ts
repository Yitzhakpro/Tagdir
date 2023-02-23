import { Command } from "commander";

export default class Enhancer {
  private program: Command;

  constructor() {
    const program = new Command()
      .name("Enhancer")
      .description("CLI to add configurations to project");

    this.program = program;
  }

  public parse() {
    this.program.parse();
  }
}
