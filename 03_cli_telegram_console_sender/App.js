import { Command } from 'commander';
import AppBot from './bot/AppBot.js';
import AppBotCommand from './commands/AppBotCommand.js';

export default class App {
  /**
   * Program instance to define command-line options and arguments.
   *
   * @private
   * @type Command
   */
  _program;

  /**
   * Bot instance responsible for handling Telegram API interactions.
   *
   * @private
   * @type AppBot
   */
  _bot;

  /**
   * Array of commands available for application.
   *
   * @private
   * @type AppBotCommand[]
   */
  _commands;

  /**
   * @param {string} bot The Telegram Bot API token.
   * @param {AppBotCommand[]} commands Array of commands to initialize the application with.
   * @param {AppOptions} options Configuration options for the app.
   */
  constructor(token, commands = [], options = {}) {
    this._bot = new AppBot(token, options);
    this._commands = commands;
    this._program = new Command();
  }

  /**
   * Runs the application, initializing the bot and parses program arguments.
   */
  async run() {
    await this._init();
    await this._program.parseAsync(process.argv);
  }

  /**
   * Initializes the bot and command-line interactions.
   *
   * @private
   */
  async _init() {
    await this._bot.init();
    this._initCommands();
  }

  /**
   * Initializes specified commands.
   *
   * @private
   */
  _initCommands() {
    for (let command of this._commands) {
      this._program
        .command(command.getName())
        .description(command.getDescription())
        .addArgument(command.getArgument())
        .action(async (argument) => {
          try {
            await command.action(this._bot, argument);
          } catch (err) {
            console.error("Can't perform an action:", err.message);
          }
        });
    }
  }
}
