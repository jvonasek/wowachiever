/**
 * Simple validator checking for empty field
 * @param {string} value
 */
export const required = (value) => (value ? null : 'This field is required.');

/**
 * Validator checking for alphanumeric characters,
 * no special characters allowed
 * @param {string} value
 */
export const alphaNumeric = (value) => {
  const test = /[^a-zA-Z0-9 ]/i.test(value);
  return value && test
    ? 'Only alphanumeric characters'
    : null;
};
