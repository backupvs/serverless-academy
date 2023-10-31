import AppBot from './bot/AppBot.js';
import MonobankAPI from './api/MonobankAPI.js';
import PrivatBankAPI from './api/PrivatBankAPI.js';
import NodeCache from 'node-cache';

/**
 * @typedef {Object} BotOptions
 *
 * @property {boolean} polling
 */

/**
 * @typedef {Object} AppOptions
 *
 * @property {BotOptions} botOptions
 */

export default class App {
  /**
   * Bot instance responsible for handling Telegram API interactions.
   *
   * @private
   * @type AppBot
   */
  _bot;

  /**
   * @param {string} token The Telegram Bot API token.
   * @param {AppOptions} options Configuration options for the app.
   */
  constructor(token, options = {}) {
    const cache = new NodeCache();
    const monobankAPI = new MonobankAPI(cache);
    const privatbankAPI = new PrivatBankAPI(cache);
    this._bot = new AppBot(token, monobankAPI, privatbankAPI, options.botOptions);
  }

  /**
   * Initializes and runs app.
   */
  run() {
    this._init();
  }

  /**
   * Initializes the App.
   *
   * @private
   */
  _init() {
    this._bot.init();
  }
}
