// @flow
/**
 * Simple validator checking for empty field
 * @param {string} value
 * @return {?string}
 */
export const required = (value: string): ?string => (value ? null : 'This field is required.');

/**
 * Validator checking for alphanumeric characters,
 * no special characters allowed
 * @param {string} value
 * @return {?string}
 */
export const alphaNumeric = (value: string): ?string => {
  const test = /[^a-zA-Z0-9 ]/i.test(value);
  return value && test
    ? 'Only alphanumeric characters'
    : null;
};
