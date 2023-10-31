import fs from 'node:fs/promises';

/**
 * Reads and parses JSON file.
 *
 * @param {string} filePath Path to JSON file.
 * @returns {Object} Parsed JSON from file.
 */
const readJSON = async (filePath) => fs.readFile(filePath).then(JSON.parse);

/**
 * Stringifies and writes JSON to file.
 *
 * @param {Object} object Object to stringify.
 * @param {string} filePath File path to write.
 */
const writeJSON = async (object, filePath) =>
  fs.writeFile(filePath, JSON.stringify(object, null, 2));

export default {
  readJSON,
  writeJSON,
};
