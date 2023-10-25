import TelegramBot from 'node-telegram-bot-api';
import OpenWeatherAPI from '../api/OpenWeatherAPI.js';
import ForecastFormatter from './ForecastFormatter.js';

/**
 * @typedef {Object} BotOptions
 *
 * @property {boolean} polling
 */
const defaultOptions = {
  polling: true,
};

/**
 * Extends the TelegramBot.
 * Represents a Telegram bot for weather forecasts
 */
export default class AppBot extends TelegramBot {
  /**
   * OpenWeatherAPI instance for retrieving weather data.
   *
   * @private
   * @type OpenWeatherAPI
   */
  _openWeatherAPI;

  /**
   * @param {string} token The Telegram Bot API token.
   * @param {OpenWeatherAPI} openWeatherAPI OpenWeatherAPI instance for retrieving weather data.
   * @param {BotOptions} options Configuration options for the bot.
   */
  constructor(token, openWeatherAPI, options = {}) {
    super(token, {
      ...defaultOptions,
      ...options,
    });

    this._openWeatherAPI = openWeatherAPI;
  }

  /**
   * Initializes the bot and sets up message handlers.
   */
  init() {
    this._initKeyboard();
    this.onText(/at intervals of (3|6) hours/, async (msg, match) => {
      const interval = match[1];
      const forecast = await this._openWeatherAPI.getHourlyForecast(interval);

      const forecastMessage = ForecastFormatter.getFormattedForecastMessage(
        forecast,
        interval
      );

      try {
        await this.sendMessage(msg.chat.id, forecastMessage, {
          parse_mode: 'Markdown',
        });
      } catch (err) {
        console.error(err.message);
      }
    });
    console.log('Bot has initialized and started polling...');
  }

  /**
   * Initializes the custom keyboard for the bot.
   */
  _initKeyboard() {
    const city = this._openWeatherAPI.getCity();

    this.onText(/\/start/, (msg) => {
      this.sendMessage(msg.chat.id, `Welcome to ${city} weather forecast bot!`, {
        reply_markup: {
          keyboard: [[`Forecast in ${city}`]],
          remove_keyboard: true,
          resize_keyboard: true,
        },
      });
    });

    this.onText(new RegExp(`Forecast in ${city}`), (msg) => {
      this.sendMessage(msg.chat.id, 'Please, choose hours rate', {
        reply_markup: {
          keyboard: [['at intervals of 3 hours'], ['at intervals of 6 hours']],
          remove_keyboard: true,
          resize_keyboard: true,
        },
      });
    });
  }
}
