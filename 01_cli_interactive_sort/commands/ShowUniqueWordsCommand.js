import Command from './Command.js';

/**
 * Command implementation to filter only unique words
 *
 * @class ShowUniqueWordsCommand
 */
class ShowUniqueWordsCommand extends Command {
  _description = 'Show only unique words';

  /**
   * Filter only unique words
   *
   * @param {any[]} data Array of elements to execute with
   * @return {string[]} Array of unique words
   */
  execute(data) {
    const memo = {};
    const result = [];
    const words = data.filter((el) => typeof el === 'string' && isNaN(el));

    for (let word of words) {
      if (memo[word]) continue;
      result.push(word);
      memo[word] = true;
    }

    return result;
  }
}

export default ShowUniqueWordsCommand;
