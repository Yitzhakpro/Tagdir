import fs from 'fs';
import path from 'path';
import { ESLINT_CONFIG_EXTENSION } from '../../../constants';
import {
	convertConfigToJson,
	convertJsonToConfig,
	getExistingFileExtension,
	getInstallCommand,
	runCommand,
} from '../../../utils';
import type { PackageManager } from '../../../types';
import type { EslintPlugin, EslintRule } from '../plugins';

class EslintConfigManager {
	private readonly packageManager: PackageManager;

	constructor(packageManager: PackageManager) {
		this.packageManager = packageManager;
	}

	private addToExtends(config: Record<string, any>, pluginExtend: string): void {
		if (!config.extends) {
			config.extends = [];
		} else if (typeof config.extends === 'string' || config.extends instanceof String) {
			config.extends = [config.extends];
		}

		config.extends.push(pluginExtend);
	}

	private addToPlugins(config: Record<string, any>, pluginName: string): void {
		if (!config.plugins) {
			config.plugins = [];
		}

		config.plugins.push(pluginName);
	}

	private addToRules(config: Record<string, any>, pluginRules: EslintRule): void {
		if (!config.rules) {
			config.rules = {};
		}

		config.rules = { ...config.rules, ...pluginRules };
	}

	private static sortEslintConfig(config: Record<string, any>): Record<string, any> {
		const orderedKeys = [
			'root', // needs to be at the beginning
			'extends',
			'ignore',
			'env',
			'globals',
			'parserOptions',
			'plugins',
			'rules',
			'overrides',
		];
		const sortedConfig: Record<string, any> = {};
		Object.keys(config)
			.sort((a, b) => orderedKeys.indexOf(a) - orderedKeys.indexOf(b))
			.forEach((key) => {
				sortedConfig[key] = config[key];
			});

		return sortedConfig;
	}

	public async addPlugins(...plugins: EslintPlugin[]): Promise<void> {
		const configExtension = getExistingFileExtension(
			'.eslintrc',
			ESLINT_CONFIG_EXTENSION,
			process.cwd()
		);
		const eslintConfigPath = path.join(process.cwd(), `.eslintrc.${configExtension}`);
		const config = await convertConfigToJson(eslintConfigPath, configExtension);

		const sortedPlugins = plugins.sort(
			(pluginA, pluginB) =>
				pluginA.getConfigurationPriority() - pluginB.getConfigurationPriority()
		);
		for (const plugin of sortedPlugins) {
			const pluginInstallations = plugin.getNeededPackages();
			const pluginName = plugin.getPluginName();
			const pluginExtend = plugin.getExtend();
			const pluginRules = plugin.getRules();

			// installing the plugin
			const pluginInstallCommand = getInstallCommand(
				this.packageManager,
				pluginInstallations.join(' '),
				true
			);
			await runCommand(pluginInstallCommand);

			this.addToPlugins(config, pluginName);
			if (pluginExtend) {
				this.addToExtends(config, pluginExtend);
			}
			if (pluginRules) {
				this.addToRules(config, pluginRules);
			}
		}

		const sortedConfig = EslintConfigManager.sortEslintConfig(config);
		const configStr = convertJsonToConfig(sortedConfig, configExtension);
		fs.writeFileSync(eslintConfigPath, configStr);
	}
}

export default EslintConfigManager;
