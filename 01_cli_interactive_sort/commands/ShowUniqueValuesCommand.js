import Command from './Command.js';

/**
 * Command implementation to filter only unique values (words and numbers)
 *
 * @class ShowUniqueValuesCommand
 */
class ShowUniqueValuesCommand extends Command {
  _description = 'Show only unique values (words and numbers)';

  /**
   * Filter only unique words
   *
   * @param {any[]} data Array of elements to execute with
   * @return {string[]} Array of unique words
   */
  execute(data) {
    const memo = {};
    const result = [];

    for (let value of data) {
      if (memo[value]) continue;
      result.push(value);
      memo[value] = true;
    }

    return result;
  }
}

export default ShowUniqueValuesCommand;
