import { spawn } from "child_process";
import { removeEndNewLine } from "./strings";

export const runCommand = async (
  command: string,
  verbose = true
): Promise<void> => {
  const process = spawn(command, { shell: true });

  process.stdout.on("data", (data: any) => {
    if (verbose) {
      const formatedText = removeEndNewLine(data.toString());
      console.log(formatedText);
    }
  });

  process.stderr.on("data", (data: any) => {
    if (verbose) {
      const formatedText = removeEndNewLine(data.toString());
      console.log(formatedText);
    }
  });

  return new Promise((resolve, reject) => {
    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Commaned failed: ${command}, with code: ${code}`));
        return;
      }

      resolve();
    });
  });
};
