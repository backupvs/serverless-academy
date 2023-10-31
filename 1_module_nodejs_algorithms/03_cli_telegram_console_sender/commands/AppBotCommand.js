import AppBot from '../bot/AppBot.js';
import { Argument } from 'commander';

/**
 * @typedef {Object} AppBotCommandArgument
 *
 * @property {string} name
 * @property {string} description
 */

/**
 * Abstract Class AppBotCommand
 *
 * @class AppBotCommand
 */
export default class AppBotCommand {
  /**
   * Command name.
   *
   * @private
   * @type string
   */
  _name;

  /**
   * Command description.
   *
   * @private
   * @type string
   */
  _description;

  /**
   * Command argument object
   *
   * @private
   * @type Argument
   */
  _argument;

  /**
   * @param {AppBot} bot
   * @param {string} name
   * @param {string} description
   * @param {AppBotCommandArgument} argument
   */
  constructor() {
    if (this.constructor == AppBotCommand) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * Performs an action using an input argument by specified bot.
   *
   * @abstract
   * @param {AppBot} bot Bot that performs action.
   * @param {any} argument Argument to use.
   * @returns {Promise<void>}
   */
  async action(bot, argument) {
    throw new Error('Method process() must be implemented');
  }

  /**
   * @returns Command name.
   */
  getName() {
    return this._name;
  }

  /**
   * @returns Command description.
   */
  getDescription() {
    return this._description;
  }

  /**
   * @returns Command argument object.
   */
  getArgument() {
    return this._argument;
  }
}
