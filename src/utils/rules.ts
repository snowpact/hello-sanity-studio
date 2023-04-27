import { ArrayRule } from 'sanity';

export function uniqueRule(Rule: ArrayRule<unknown[]>) {
  return Rule.unique();
}
