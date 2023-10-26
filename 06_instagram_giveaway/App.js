import utils from './utils.js';

export default class App {
  /**
   * Path to directory with files to be analyzed.
   *
   * @private
   * @type string
   */
  _filesDirPath;

  /**
   * @param {string} filesDirPath Path to directory with files to be analyzed
   */
  constructor(filesDirPath) {
    this._filesDirPath = filesDirPath;
  }

  async run() {
    const filePaths = await utils.getFilesAbsolutePathsInDir(this._filesDirPath);

    await utils.logResultAndTimeElapsed(this.uniqueValues, filePaths);
    await utils.logResultAndTimeElapsed(this.existInAllFiles, filePaths);
    await utils.logResultAndTimeElapsed(this.existInAtLeastTen, filePaths);
  }

  /**
   * Counts the number of unique words from all files of specified paths.
   *
   * @param {string[]} filePaths Array of file paths to analyze.
   * @returns {Promise<number>} Number of unique words from all files.
   */
  async uniqueValues(filePaths) {
    const fileContents = await utils.readFilesAsync(filePaths);
    const memo = {};

    // Check content of each file
    for (let fileContent of fileContents) {
      fileContent.split('\n').forEach((word) => {
        // Do nothing if word is already in memo
        if (memo[word]) return;

        // Init word with some simple value to know that it is assigned
        memo[word] = true;
      });
    }

    return Object.keys(memo).length;
  }

  /**
   * Counts the number of words that exists in each file of specified paths.
   *
   * @param {string[]} filePaths Array of file paths to analyze.
   * @returns {Promise<number>} Number of words that exist in each file.
   */
  async existInAllFiles(filePaths) {
    const fileContents = await utils.readFilesAsync(filePaths);

    // Initialize uniqueBasicWords with unique words from first file
    const basicUniqueWords = new Set(fileContents[0].split('\n'));

    // Check content of rest of the files.
    for (let i = 1; i < fileContents.length; i++) {
      // Get unique words from current file
      const currentUniqueWords = new Set(fileContents[i].split('\n'));

      // Delete word from basic set if it doesn't exist in current file
      // so set will remain with only those words that were found in all files.
      for (const word of basicUniqueWords) {
        if (!currentUniqueWords.has(word)) {
          basicUniqueWords.delete(word);
        }
      }
    }

    return basicUniqueWords.size;
  }

  /**
   * Counts the number of words that exist in at least 10 files of specified paths.
   *
   * @param {string[]} filePaths Array of file paths to analyze.
   * @returns {Promise<number>} Number of words that exist in at least 10 files.
   */
  async existInAtLeastTen(filePaths) {
    const fileContents = await utils.readFilesAsync(filePaths);
    const memo = {};
    const resultSet = new Set();

    // Check content of each file
    for (let fileContent of fileContents) {
      fileContent.split('\n').forEach((word) => {
        // Init counter if met for the first time
        if (!memo[word]) {
          memo[word] = 1;
        } else {
          // Add word to result set if counter is already >= 10
          // and set doesn't has this word.
          if (++memo[word] >= 10 && !resultSet.has(word)) {
            resultSet.add(word);
          }
        }
      });
    }

    return resultSet.size;
  }

  // /**
  //  *
  //  * @param {Function} func
  //  * @param  {...any} args
  //  */
  // async _logResultAndTimeElapsed(func, arg, ...argArray) {
  //   const start = performance.now();
  //   const result = await func.call(this, arg, ...argArray);
  //   const timeElapsed = `${(performance.now() - start).toFixed(3)}ms`;
  //   console.log(`${func.name}() result: ${result}. Time elapsed: ${timeElapsed}`);
  // }
}
