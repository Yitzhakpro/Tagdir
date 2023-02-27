import chalk from "chalk";

class Logger {
  public static info(message: string) {
    const infoPrefix = `${chalk.bold("[")}${chalk.blue("INFO")}${chalk.bold(
      "]"
    )}`;
    const formattedString = chalk.bold(message);

    console.log(`${infoPrefix} ${formattedString}`);
  }

  public static success(message: string) {
    const successPrefix = `${chalk.bold("[")}${chalk.green(
      "SUCCESS"
    )}${chalk.bold("]")}`;
    const formattedString = chalk.bold(message);

    console.log(`${successPrefix} ${formattedString}`);
  }

  public static warn(message: string) {
    const warnPrefix = `${chalk.bold("[")}${chalk.yellow(
      "WARNING"
    )}${chalk.bold("]")}`;
    const formattedString = chalk.bold(message);

    console.log(`${warnPrefix} ${formattedString}`);
  }

  public static error(message: string) {
    const errorPrefix = `${chalk.bold("[")}${chalk.red("ERROR")}${chalk.bold(
      "]"
    )}`;
    const formattedString = chalk.bold(message);

    console.log(`${errorPrefix} ${formattedString}`);
  }
}

export default Logger;
