import { EslintPlugin } from "./base";

// TODO: think if need to install eslint-config-prettier
export class PrettierPlugin extends EslintPlugin {
  constructor() {
    super("eslint-plugin-prettier", { "prettier/prettier": "error" });
  }
}
