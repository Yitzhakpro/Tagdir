import { EslintPlugin } from "./base";

export class PrettierPlugin extends EslintPlugin {
  constructor() {
    super(
      "eslint-plugin-prettier",
      {
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
      },
      "recommended",
      "eslint-config-prettier"
    );
  }
}
