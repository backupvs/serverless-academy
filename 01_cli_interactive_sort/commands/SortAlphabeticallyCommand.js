import Command from './Command.js';

/**
 * Command implementation of sorting words alphabetically (A-Z)
 *
 * @class SortAlphabeticallyCommand
 */
class SortAlphabeticallyCommand extends Command {
  _description = 'Words by name (from A to Z)';

  /**
   * Sorts words alphabetically (A-Z)
   * @param {any[]} data Array of elements to execute with
   * @return {string[]} Array of sorted words
   */
  execute(data) {
    return data.filter((el) => typeof el === 'string' && isNaN(e)).sort();
  }
}

export default SortAlphabeticallyCommand;
