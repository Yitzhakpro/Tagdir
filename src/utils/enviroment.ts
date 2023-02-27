import fs from "fs";
import path from "path";
import { readNthLine } from "./files";
import type { PackageManager } from "../types";

export const getPackageManagerName = async (): Promise<PackageManager> => {
  const yarnLockFilePath = path.join(process.cwd(), "yarn.lock");
  const pnpmLockFilePath = path.join(process.cwd(), "pnpm-lock.yaml");
  const isYarnLockExists = fs.existsSync(yarnLockFilePath);
  const isPnpmLockExists = fs.existsSync(pnpmLockFilePath);

  if (!isYarnLockExists && !isPnpmLockExists) {
    return "npm";
  } else if (isYarnLockExists) {
    const versionLine = await readNthLine(yarnLockFilePath, 2);
    if (versionLine.includes("yarn lockfile v1")) {
      return "yarn1";
    }
    return "yarn2";
  } else if (isPnpmLockExists) {
    return "pnpm";
  }

  throw new Error("Could not find package manager in this project");
};

export const isPackageInstalled = (packageName: string): boolean => {
  const packageJsonLocation = path.join(process.cwd(), "package.json");
  const packageJsonBuffer = fs.readFileSync(packageJsonLocation);
  const packageJson = JSON.parse(packageJsonBuffer.toString());

  if (
    (packageJson.devDependencies && packageJson.devDependencies[packageName]) ||
    (packageJson.dependencies && packageJson.dependencies[packageName])
  ) {
    return true;
  }

  return false;
};
