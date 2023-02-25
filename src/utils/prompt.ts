import inquirer from "inquirer";

class Prompt {
  public static async getConfirmation(
    name: string,
    question: string
  ): Promise<boolean> {
    try {
      const answer: Record<string, boolean> = await inquirer.prompt([
        { type: "confirm", name, message: question },
      ]);

      return answer[name];
    } catch (error) {
      console.error(error);
      throw new Error("Can't get user confirmation");
    }
  }
}

export default Prompt;
