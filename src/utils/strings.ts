export const removeEndNewLine = (text: string): string => {
	if (text.endsWith('\n')) {
		return text.slice(0, text.length - 1);
	}

	return text;
};
