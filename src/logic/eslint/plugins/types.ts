export type RuleSeverity = 0 | 'off' | 1 | 'warn' | 2 | 'error';

type EslintRuleValue = RuleSeverity | [RuleSeverity, Record<string, any>];

export type EslintRule = Record<string, EslintRuleValue>;
