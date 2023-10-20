import Command from './commands/Command.js';
import readline from 'readline/promises';

/**
 * @typedef {Object} AppOptions
 * @property {string} exitCommandName
 * @property {string} mainPromptText
 * @property {NodeJS.Process.stdin} inputStream
 * @property {NodeJS.Process.stdout} outputStream
 */
const defaultOptions = {
  exitCommandName: 'exit',
  mainPromptText: 'Hello. Enter words or digits deviding them in spaces: ',
  inputStream: process.stdin,
  outputStream: process.stdout,
};

class App {
  /**
   * Array of available commands
   * @private
   * @type Command[]
   */
  _commands;

  /**
   * Command name to exit from application
   * @private
   * @type {string}
   */
  _exitCommandName;

  /**
   * An interface for interaction with the user through the command line,
   * used for reading user input and displaying text on the screen.
   * @private
   * @type {readline.Interface}
   */
  _readline;

  /**
   * @param {Command[]} commands Array of commands to add to this app
   * @param {AppOptions} options
   */
  constructor(commands = [], options = {}) {
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
    let answer = '';

    while (answer !== this._exitCommandName) {
      if (answer === this._exitCommandName) break;

      answer = await this._readline.question(
        'Hello. Enter words or digits deviding them in spaces: '
      );

      this.showAvailableCommands();
    }

    this._readline.close();
  }

  showAvailableCommands() {
    for (let i = 0; i < this._commands.length; i++) {
      console.log(`${i + 1}. ${this._commands[i].getDescription()}.`);
    }
  }
}

export default App;
