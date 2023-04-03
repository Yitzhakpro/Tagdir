import {
	addScriptToPackageJson,
	copyTemplateFiles,
	isPackageInstalled,
	isReactProject,
	Logger,
	runCommand,
} from '../../utils';
import { ImportPlugin, ReactHooksPlugin } from './plugins';
import type EslintConfigManager from './configManager';
import type { EslintPlugin } from './plugins';
import type { LogicConfig } from '../../types';
import type { BaseLogic } from '../base';

class Eslint implements BaseLogic {
	/*
    TODO: try to think what to do when this error comes: https://github.com/eslint/create-config/issues/40
  */
	private static async initEslint(): Promise<void> {
		try {
			Logger.info('Initializing eslint...');

			const eslintInitCommand = 'npm init @eslint/config';
			// TODO: capture deps if didn't auto install, from stdout
			await runCommand(eslintInitCommand, true, {
				stdio: ['inherit', 'inherit', 'inherit'],
			});

			Logger.success('Initialized eslint successfully!');
		} catch (error) {
			Logger.error('Failed to init eslint');
			console.error(error);
			process.exit(1);
		}
	}

	private static async enhanceDefaultConfiguration(
		eslintConfigManager: EslintConfigManager
	): Promise<void> {
		const isReactProgram = isReactProject();
		const addingPlugins: EslintPlugin[] = [];

		if (isReactProgram) {
			addingPlugins.push(new ReactHooksPlugin());
		}
		addingPlugins.push(new ImportPlugin(isReactProgram));

		await eslintConfigManager.addPlugins(...addingPlugins);
	}

	private static async createEslintConfigurations(
		eslintConfigManager: EslintConfigManager
	): Promise<void> {
		copyTemplateFiles('eslint', process.cwd());
		await Eslint.enhanceDefaultConfiguration(eslintConfigManager);

		Logger.success('Created default .eslintignore configuration file.');
		Logger.info(
			'You can modify the ignore file according to your needs, for more info: https://eslint.org/docs/latest/use/configure/ignore'
		);
	}

	private static addEslintScripts(): void {
		addScriptToPackageJson('lint:check', 'npx eslint src/**/*');
		addScriptToPackageJson('lint:fix', 'npx eslint src/**/* --fix');

		Logger.success('Added default eslint scripts to package.json');
		Logger.info(
			'You can modify the scripts according to your needs, for more info: https://eslint.org/docs/latest/use/command-line-interface'
		);
	}

	public async apply(config: LogicConfig): Promise<void> {
		if (!isPackageInstalled('eslint')) {
			const { eslintConfigManager } = config;

			await Eslint.initEslint();
			await Eslint.createEslintConfigurations(eslintConfigManager);
			Eslint.addEslintScripts();
		} else {
			Logger.warn('Eslint is already installed, skipping.');
		}
	}
}

export default Eslint;
