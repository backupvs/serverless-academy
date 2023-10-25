import AppBot from './bot/AppBot.js';
import OpenWeatherAPI from './api/OpenWeatherAPI.js';

/**
 * @typedef {Object} APIOptions
 *
 * @property {string} version
 * @property {string} units
 */

/**
 * @typedef {Object} BotOptions
 *
 * @property {boolean} polling
 */

/**
 * @typedef {Object} AppOptions
 *
 * @property {BotOptions} botOptions
 * @property {APIOptions} apiOptions
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
   * City name to request weather for.
   *
   * @private
   * @type string
   */
  _city;

  /**
   * @param {string} token The Telegram Bot API token.
   * @param {string} openWeatherAPIKey The OpenWeather API key.
   * @param {AppOptions} options Configuration options for the app.
   */
  constructor(token, openWeatherAPIKey, city, options = {}) {
    const openWeatherAPI = new OpenWeatherAPI(
      openWeatherAPIKey,
      city,
      options.apiOptions
    );
    this._bot = new AppBot(token, openWeatherAPI, options.botOptions);
    this._city = city;
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
