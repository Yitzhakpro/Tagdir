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

export const getPackageRunnerCommand = (
  packageManager: PackageManager,
  packageName: string
): string => {
  if (packageManager === "npm" || packageManager === "yarn1") {
    return `npx ${packageName}`;
  } else if (packageManager === "yarn2") {
    return `yarn dlx ${packageName}`;
  } else {
    return `pnpm dlx ${packageName}`;
  }
};

export const getInstallCommand = (
  packageManager: PackageManager,
  packageName: string,
  isDevDep: boolean
): string => {
  let command = "";

  if (packageManager === "npm") {
    command += "npm i ";
  } else if (packageManager === "yarn1" || packageManager === "yarn2") {
    command += "yarn add ";
  } else {
    command += "pnpm add ";
  }

  if (isDevDep) {
    command += "-D ";
  }

  command += packageName;

  return command;
};

export const getInstallAllDepsCommand = (
  packageManager: PackageManager
): string => {
  if (packageManager === "npm") {
    return "npm i";
  } else if (packageManager === "yarn1" || packageManager === "yarn2") {
    return "yarn";
  } else {
    return "pnpm i";
  }
};
