import { Command, Argument } from 'commander';
import { CONFIGURATIONS_ORDER, EslintConfigManager } from '../../logic';
import { getPackageManagerName } from '../../utils';
import { CONFIGURATIONS } from './constants';
import type { Configuration, LogicConfig } from '../../types';

class Add {
	public command: Command;

	constructor() {
		const addCommand = new Command('add')
			.summary('add a configuration to existing project')
			.description(
				"Add new configuration to existing project, you may include multiple configurations, using seperated values (with space or ', ')."
			)
			.addArgument(
				new Argument('<configurations...>', 'Configuration name(s).').choices(
					CONFIGURATIONS
				)
			)
			.action(async (configurations: Configuration[]) => {
				await this.handler(configurations);
			});

		this.command = addCommand;
	}

	private async handler(configurations: Configuration[]): Promise<void> {
		const packageManager = await getPackageManagerName();
		const eslintConfigManager = new EslintConfigManager(packageManager);
		const helperConfig: LogicConfig = { packageManager, eslintConfigManager };

		for (const configOrder of CONFIGURATIONS_ORDER) {
			if (configurations.includes(configOrder.name)) {
				await configOrder.apply(helperConfig);

				console.log('');
			}
		}
	}
}

export default new Add();
