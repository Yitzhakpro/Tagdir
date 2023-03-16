import { Eslint } from './eslint';
import Husky from './husky';
import Prettier from './prettier';
import type { ApplyFunction } from './base';
import type { Configuration } from '../types';

const eslint = new Eslint();
const prettier = new Prettier();
const husky = new Husky();

interface ConfigurationDetail {
	name: Configuration;
	apply: ApplyFunction;
}

export const CONFIGURATIONS_ORDER: ConfigurationDetail[] = [
	{ name: 'eslint', apply: eslint.apply },
	{ name: 'prettier', apply: prettier.apply },
	{ name: 'husky', apply: husky.apply },
];
