import { copySpecificTemplateFile, getPromptSelection, Logger } from '../../utils';
import type { LicenseName } from './types';
import type { LogicConfig } from '../../types';
import type { BaseLogic } from '../base';

class License implements BaseLogic {
	// TODO: think if any other way to implement
	private static async getSelectedLicense(): Promise<string> {
		const licenseNameToFilesMapping: Record<LicenseName, string> = {
			MIT: 'mitLicense',
			'Apache v2': 'apacheV2License',
			'GNU GPLv3': 'gplV3License',
		};
		const licenseNames = Object.keys(licenseNameToFilesMapping) as LicenseName[];

		const selectedLicense = await getPromptSelection(
			'license',
			'Choose a license to add:',
			licenseNames
		);

		return licenseNameToFilesMapping[selectedLicense];
	}

	private static createLicenseFile(licenseFileName: string): void {
		Logger.info('Creating LICENSE file...');

		copySpecificTemplateFile('licenses', licenseFileName, process.cwd(), 'LICENSE');

		Logger.success('Created the LICENSE file successfully!');
		Logger.info(
			'Make sure that you add the necessary things according to the LICENSE, for more info visit: https://choosealicense.com/licenses/'
		);
	}

	public async apply(_config: LogicConfig): Promise<void> {
		const selectedLicenseFileName = await License.getSelectedLicense();
		License.createLicenseFile(selectedLicenseFileName);
	}
}

export default License;
