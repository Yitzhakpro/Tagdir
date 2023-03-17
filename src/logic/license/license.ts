import { copySpecificTemplateFile, getPromptSelection } from '../../utils';
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
		copySpecificTemplateFile('licenses', licenseFileName, process.cwd(), 'LICENSE');
	}

	public async apply(_config: LogicConfig): Promise<void> {
		const selectedLicense = await License.getSelectedLicense();
		License.createLicenseFile(selectedLicense);
	}
}

export default License;
