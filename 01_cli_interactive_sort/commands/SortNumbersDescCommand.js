import Command from './Command.js';

/**
 * Command implementation of sorting numbers from greater to lesser
 *
 * @class SortNumbersDescCommand
 */
class SortNumbersDescCommand extends Command {
  _description = 'Show numbers from greater to lesser';

  /**
   * Sorts numbers from greater to lesser
   *
   * @param {any[]} data Array of elements to execute with
   * @return {string[]} Array of sorted numbers
   */
  execute(data) {
    return data
      .filter((el) => typeof el === 'string' && !isNaN(el))
      .sort((a, b) => b - a);
  }
}

export default SortNumbersDescCommand;
