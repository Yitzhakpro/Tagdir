import inquirer from "inquirer";

export const getConfirmation = async (
  name: string,
  question: string
): Promise<boolean> => {
  try {
    const answer: Record<string, boolean> = await inquirer.prompt([
      { type: "confirm", name, message: question },
    ]);

    return answer[name];
  } catch (error) {
    console.error(error);
    throw new Error("Can't get user confirmation");
  }
};
