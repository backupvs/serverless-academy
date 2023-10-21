import Command from './commands/Command.js';
import readline from 'readline/promises';

/**
 * @typedef {Object} AppOptions
 *
 * @property {string} exitCommandName
 * @property {NodeJS.Process.stdin} inputStream
 * @property {NodeJS.Process.stdout} outputStream
 */
const defaultOptions = {
  exitCommandName: 'exit',
  inputStream: process.stdin,
  outputStream: process.stdout,
};

class App {
  /**
   * Array of available commands
   *
   * @private
   * @type Command[]
   */
  _commands;

  /**
   * Command name to exit from application
   *
   * @private
   * @type string
   */
  _exitCommandName;

  /**
   * An interface for interaction with the user through the command line,
   * used for reading user input and displaying text on the screen.
   *
   * @private
   * @type readline.Interface
   */
  _readline;

  /**
   * @param {Command[]} commands Array of commands to add to this app
   * @param {AppOptions} options
   */
  constructor(commands, options = {}) {
    if (!commands || commands.length === 0) {
      throw new Error('At least one command should be specified!');
    }

    this._commands = commands;
    this._exitCommandName = options.exitCommandName || defaultOptions.exitCommandName;
    this._readline = readline.createInterface({
      input: options.inputStream || defaultOptions.inputStream,
      output: options.outputStream || defaultOptions.outputStream,
    });
  }

  /**
   * The main loop of the app,
   * in which the user is prompted for a string until the exit command is entered.
   */
  async run() {
    while (true) {
      const elementsToSort = await this._askInputString();
      this._printAvailableCommands();

      const commandNumber = await this._askCommandNumber();
      if (commandNumber === -1) break;

      console.log(this._commands[commandNumber - 1].execute(elementsToSort));
    }

    this._readline.close();
  }

  /**
   * Asks the user to type words or numbers separated by space
   *
   * @private
   * @returns {Promise<string[]>} Array with words or numbers
   */
  async _askInputString() {
    const inputString = await this._readline.question(
      'Hello. Enter words or digits deviding them in spaces: '
    );

    return this._parseInputString(inputString);
  }

  /**
   * Prints available commands to the console
   *
   * @private
   */
  _printAvailableCommands() {
    console.log('How would you like to sort values:');
    for (let i = 0; i < this._commands.length; i++) {
      console.log(`${i + 1}. ${this._commands[i].getDescription()}.`);
    }
  }

  /**
   * Asks the user to type command number
   * @private
   * @returns {Promise<number>} Number of choosen command or -1 if it was exit command
   */
  async _askCommandNumber() {
    const minCommandNumber = 1;
    const maxCommandNumber = this._commands.length;

    while (true) {
      const answer = await this._readline.question(
        `\nSelect ( ${minCommandNumber} - ${maxCommandNumber} ) and press ENTER: `
      );

      if (answer.trim().toLowerCase() === this._exitCommandName) return -1;

      const commandNumber = parseInt(answer);
      if (
        Number.isInteger(commandNumber) &&
        commandNumber >= minCommandNumber &&
        commandNumber <= maxCommandNumber
      ) {
        return commandNumber;
      }
    }
  }

  /**
   * Trims spaces, splits by spaces and filter from empty string
   *
   * @private
   * @param {string} str
   */
  _parseInputString(str) {
    return str
      .trim()
      .split(' ')
      .filter((e) => e !== '');
  }
}

export default App;
