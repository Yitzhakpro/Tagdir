import fs from 'fs';
import path from 'path';
import readline from 'readline';
import yaml from 'yaml';
import type { ConfigExtensions } from '../types';

export const readNthLine = async (filePath: string, lineNumber: number): Promise<string> => {
	const fileStream = fs.createReadStream(filePath);
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	let currentLineNumber = 0;
	for await (const line of rl) {
		currentLineNumber += 1;
		if (currentLineNumber === lineNumber) {
			rl.close();
			return line;
		}
	}

	throw new Error(`Could not parse file ${filePath}`);
};

export const copyTemplateFiles = (templateType: string, destination: string): void => {
	const templateFolderLocation = path.join(__dirname, '..', '..', 'templates', templateType);

	const templateFiles = fs.readdirSync(templateFolderLocation);

	templateFiles.forEach((fileName) => {
		const finalFileName = fileName.startsWith('_') ? fileName.slice(1) : fileName;
		const fullTemplateFilePath = path.join(templateFolderLocation, fileName);
		const destinationTemplatePath = path.join(destination, finalFileName);

		fs.copyFileSync(fullTemplateFilePath, destinationTemplatePath);
	});
};

export const getExistingFileExtension = <T>(
	filename: string,
	extensions: T[],
	basePath: string
): T => {
	for (const extention of extensions) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		const fullFilePath = path.join(basePath, `${filename}.${extention}`);
		if (fs.existsSync(fullFilePath)) {
			return extention;
		}
	}

	throw new Error(`Could not find any possible files for: ${filename}`);
};

export const convertConfigToJson = async (
	configPath: string,
	extension: ConfigExtensions
): Promise<Record<string, unknown>> => {
	if (extension === 'js' || extension === 'cjs') {
		const config = await import(configPath);
		const jsonString = JSON.stringify(config);
		const jsonConfig: Record<string, unknown> = JSON.parse(jsonString);

		return jsonConfig;
	}

	const configFileBuffer = fs.readFileSync(configPath);
	const configFileString = configFileBuffer.toString();

	if (extension === 'json') {
		const jsonConfig: Record<string, unknown> = JSON.parse(configFileString);
		return jsonConfig;
	} else {
		const yamlToJSON: Record<string, unknown> = yaml.parse(configFileString);
		return yamlToJSON;
	}
};

export const convertJsonToConfig = (
	config: Record<string, unknown>,
	toExtension: ConfigExtensions
): string => {
	if (toExtension === 'yaml' || toExtension === 'yml') {
		const configStr = yaml.stringify(config);

		return configStr;
	}

	const jsonData = JSON.stringify(config, null, 2);

	if (toExtension === 'cjs' || toExtension === 'js') {
		const configStr = `module.exports = ${jsonData}`;

		return configStr;
	}

	return jsonData;
};
