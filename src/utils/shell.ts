import { spawn } from "child_process";
import { removeEndNewLine } from "./strings";
import type {
  SpawnOptionsWithStdioTuple,
  StdioNull,
  StdioPipe,
} from "child_process";

export const runCommand = async (
  command: string,
  verbose = true,
  options?: SpawnOptionsWithStdioTuple<
    StdioNull | StdioPipe,
    StdioNull | StdioPipe,
    StdioNull | StdioPipe
  >
): Promise<void> => {
  const process = spawn(command, { shell: true, ...options });

  if (process.stdout) {
    process.stdout.on("data", (data: any) => {
      if (verbose) {
        const formatedText = removeEndNewLine(data.toString());
        console.log(formatedText);
      }
    });
  }

  if (process.stderr) {
    process.stderr.on("data", (data: any) => {
      if (verbose) {
        const formatedText = removeEndNewLine(data.toString());
        console.error(formatedText);
      }
    });
  }

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
