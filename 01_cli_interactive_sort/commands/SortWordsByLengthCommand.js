import Command from './Command.js';

/**
 * Command implementation of sorting words by length in ascending order
 *
 * @class SortWordsByLengthCommand
 */
class SortWordsByLengthCommand extends Command {
  _description = 'Words by length in ascending order';

  /**
   * Sorts words by length in ascending order
   *
   * @param {any[]} data Array of elements to execute with
   * @return {string[]} Array of sorted words
   */
  execute(data) {
    return data
      .filter((el) => typeof el === 'string' && isNaN(el))
      .sort((a, b) => a.length - b.length);
  }
}

export default SortWordsByLengthCommand;
