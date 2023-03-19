import { copySpecificTemplateFile, getPromptSelection, Logger } from '../../utils';
import { LICENSE_NAMES } from './constants';
import type { LicenseName } from './types';
import type { LogicConfig } from '../../types';
import type { BaseLogic } from '../base';

class License implements BaseLogic {
	private static async getSelectedLicense(): Promise<LicenseName> {
		const selectedLicense = await getPromptSelection(
			'license',
			'Choose a license to add:',
			LICENSE_NAMES
		);

		return selectedLicense;
	}

	private static createLicenseFile(licenseName: LicenseName): void {
		const licenseNameToFile: Record<LicenseName, string> = {
			MIT: 'mitLicense',
			'Apache v2': 'apacheV2License',
			'GNU GPLv3': 'gplV3License',
		};

		Logger.info('Creating LICENSE file...');

		copySpecificTemplateFile(
			'licenses',
			licenseNameToFile[licenseName],
			process.cwd(),
			'LICENSE'
		);

		Logger.success('Created the LICENSE file successfully!');
		Logger.info(
			'Make sure that you add the necessary things according to the LICENSE, for more info visit: https://choosealicense.com/licenses/'
		);
	}

	public async apply(_config: LogicConfig): Promise<void> {
		const selectedLicense = await License.getSelectedLicense();
		License.createLicenseFile(selectedLicense);
	}
}

export default License;
