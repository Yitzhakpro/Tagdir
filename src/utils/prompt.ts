import inquirer from 'inquirer';
import type { ConfirmQuestionOptions } from 'inquirer';

export const getConfirmation = async (
	name: string,
	question: string,
	options?: Omit<ConfirmQuestionOptions, 'name' | 'question'>
): Promise<boolean> => {
	try {
		const answer: Record<string, boolean> = await inquirer.prompt([
			{ type: 'confirm', name, message: question, ...options },
		]);

		return answer[name];
	} catch (error) {
		console.error(error);
		throw new Error("Can't get user confirmation");
	}
};
