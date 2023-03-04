import chalk from "chalk";

export const info = (message: string) => {
  const infoPrefix = `${chalk.bold("[")}${chalk.blue("INFO")}${chalk.bold(
    "]"
  )}`;
  const formattedString = chalk.bold(message);

  console.log(`${infoPrefix} ${formattedString}`);
};

export const success = (message: string) => {
  const successPrefix = `${chalk.bold("[")}${chalk.green(
    "SUCCESS"
  )}${chalk.bold("]")}`;
  const formattedString = chalk.bold(message);

  console.log(`${successPrefix} ${formattedString}`);
};

export const warn = (message: string) => {
  const warnPrefix = `${chalk.bold("[")}${chalk.yellow("WARNING")}${chalk.bold(
    "]"
  )}`;
  const formattedString = chalk.bold(message);

  console.warn(`${warnPrefix} ${formattedString}`);
};

export const error = (message: string) => {
  const errorPrefix = `${chalk.bold("[")}${chalk.red("ERROR")}${chalk.bold(
    "]"
  )}`;
  const formattedString = chalk.bold(message);

  console.error(`${errorPrefix} ${formattedString}`);
};
