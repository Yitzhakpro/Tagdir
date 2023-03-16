import type { EslintConfigManager } from "../logic";
import type { PackageManager } from "./enviroment.types";

export interface HelperConfig {
  packageManager: PackageManager;
  eslintConfigManager: EslintConfigManager;
}

export type ConfigExtensions = "js" | "cjs" | "yaml" | "yml" | "json";
