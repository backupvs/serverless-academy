import Command from './Command.js';

/**
 * Command implementation of sorting numbers from lesser to greater
 *
 * @class SortNumbersAscCommand
 */
class SortNumbersAscCommand extends Command {
  _description = 'Show numbers from lesser to greater';

  /**
   * Sorts numbers from lesser to greater
   *
   * @param {any[]} data Array of elements to execute with
   * @return {string[]} Array of sorted numbers
   */
  execute(data) {
    return data.filter((el) => typeof el === 'string' && !isNaN(el)).sort();
  }
}

export default SortNumbersAscCommand;
