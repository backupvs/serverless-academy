import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Reads files asynchronously by paths array.
 *
 * @param {string[]} filePaths Array of file paths to read.
 * @returns {Promise<string[]>}
 */
const readFilesAsync = async (filePaths) => {
  return Promise.all(filePaths.map((path) => fs.readFile(path, 'utf-8')));
};

/**
 * Returns array of absolute paths of each file in specified directory.
 *
 * @param {string} dirPath Path to directory.
 * @returns {Promise<string[]>}
 */
const getFilesAbsolutePathsInDir = async (dirPath) => {
  const filenames = await fs.readdir(dirPath);
  return filenames.map((filename) => `${path.join(dirPath, filename)}`);
};

/**
 * Calls function with provided aruments and logs
 * returned result and time elapsed.
 *
 * @param {Function} func Function to execute.
 * @param {any} args // Arguments to pass.
 */
const logResultAndTimeElapsed = async (func, ...args) => {
  const start = performance.now();
  const result = await func(...args);
  const timeElapsed = `${(performance.now() - start).toFixed(3)}ms`;
  console.log(`${func.name}() result: ${result}. Time elapsed: ${timeElapsed}`);
};

export default {
  getFilesAbsolutePathsInDir,
  readFilesAsync,
  logResultAndTimeElapsed,
};
