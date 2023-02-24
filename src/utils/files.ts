import fs from "fs";
import readline from "readline";

export const readNthLine = async (
  filePath: string,
  lineNumber: number
): Promise<string> => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let currentLineNumber = 0;
  for await (const line of rl) {
    currentLineNumber += 1;
    if (currentLineNumber === lineNumber) {
      rl.close();
      return line;
    }
  }

  throw new Error(`Could not parse file ${filePath}`);
};
