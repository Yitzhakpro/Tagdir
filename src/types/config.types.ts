import { PackageManager } from "./enviroment.types";

export interface HelperConfig {
  packageManager: PackageManager;
}

export type ConfigExtensions = "js" | "cjs" | "yaml" | "yml" | "json";
