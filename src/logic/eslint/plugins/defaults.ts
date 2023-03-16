import { EslintPlugin } from "./base";
import type { EslintRule, RuleSeverity } from "./types";

export class ImportPlugin extends EslintPlugin {
  constructor(isReactProject = false) {
    const importRules: EslintRule = {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          alphabetize: { order: "asc" },
        },
      ],
    };

    if (isReactProject) {
      const importOrderRuleOptions = importRules["import/order"] as [
        RuleSeverity,
        Record<string, any>
      ];
      importOrderRuleOptions[1].pathGroups = [
        {
          pattern: "react",
          group: "builtin",
          position: "before",
        },
      ];
      importOrderRuleOptions[1].pathGroupsExcludedImportTypes = ["react"];
    }

    super("eslint-plugin-import", importRules, "recommended");
  }
}

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
      "eslint-config-prettier",
      9999
    );
  }
}

export class ReactHooksPlugin extends EslintPlugin {
  constructor() {
    super(
      "eslint-plugin-react-hooks",
      {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
      "recommended"
    );
  }
}
