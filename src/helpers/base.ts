import type { HelperConfig } from "../types";

export interface BaseHelper {
  apply: (config: HelperConfig) => Promise<void>;
}
