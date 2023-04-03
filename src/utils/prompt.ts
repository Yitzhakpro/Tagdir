import inquirer from 'inquirer';
import type { ConfirmQuestionOptions, ListChoiceOptions } from 'inquirer';

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

export const getPromptSelection = async <T>(
	name: string,
	message: string,
	choices: T[],
	options?: Omit<ListChoiceOptions, 'name' | 'question' | 'choices'>
): Promise<T> => {
	try {
		const answer: Record<string, T> = await inquirer.prompt([
			{ type: 'list', name, message, choices, ...options },
		]);

		return answer[name];
	} catch (error) {
		console.error(error);
		throw new Error('Cant get user selection');
	}
};
