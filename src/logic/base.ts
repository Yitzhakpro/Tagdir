import type { LogicConfig } from '../types';

export type ApplyFunction = (config: LogicConfig) => Promise<void>;

export interface BaseLogic {
	apply: ApplyFunction;
}
