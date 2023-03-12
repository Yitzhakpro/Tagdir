type RuleSeverity = 0 | "off" | 1 | "warn" | 2 | "error";

type EslintRuleValue = RuleSeverity | [RuleSeverity, any];

export interface EslintRule {
  [pluginName: string]: EslintRuleValue;
}
