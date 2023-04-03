import type { PackageManager } from './enviroment.types';
import type { EslintConfigManager } from '../logic';

export interface LogicConfig {
	packageManager: PackageManager;
	eslintConfigManager: EslintConfigManager;
}

export type ConfigExtensions = 'js' | 'cjs' | 'yaml' | 'yml' | 'json';
