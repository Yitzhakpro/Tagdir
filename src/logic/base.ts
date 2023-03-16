import type { HelperConfig } from '../types';

export type ApplyFunction = (config: HelperConfig) => Promise<void>;

export interface BaseHelper {
	apply: ApplyFunction;
}
