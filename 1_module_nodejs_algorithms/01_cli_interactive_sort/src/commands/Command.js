/**
 * Abstract Class Command
 *
 * @class Command
 */
class Command {
  /**
   * @type {string}
   * @private
   */
  _description;

  constructor() {
    if (this.constructor == Command) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * @abstract Execute command with given data by implemented method
   * @param {any[]} data Array of elements to execute with
   *
   * @return Array of sorted elements
   */
  execute(data) {
    throw new Error('Method process() must be implemented');
  }

  getDescription() {
    return this._description;
  }
}

export default Command;
