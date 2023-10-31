/**
 * Checks if string represents integer.
 *
 * @param {string} str String to check
 * @returns boolean
 */
export const isIntegerString = (str) => {
  const num = parseInt(str, 10);

  return !isNaN(num) && num.toString() === str;
};
