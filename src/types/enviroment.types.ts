export type PackageManager = "npm" | "yarn1" | "yarn2" | "pnpm";

export type InstallMapping = Record<PackageManager, string>;
