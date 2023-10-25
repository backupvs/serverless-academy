import TelegramBot from 'node-telegram-bot-api';
import PrivatBankAPI from '../api/PrivatBankAPI.js';
import MonobankAPI from '../api/MonobankAPI.js';
import ExchangeRateFormatter from './ExchangeRateFormatter.js';

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
   * MonobankAPI instance for retrieving exchange rate.
   *
   * @private
   * @type MonobankAPI
   */
  _monobankAPI;

  /**
   * PrivatBankAPI instance for retrieving exchange rate.
   *
   * @private
   * @type PrivatBankAPI
   */
  _privatbankAPI;

  /**
   * @param {string} token The Telegram Bot API token.
   * @param {MonobankAPI} monobankAPI MonobankAPI instance for retrieving exchange rate.
   * @param {PrivatBankAPI} privatbankAPI PrivatBankAPI instance for retrieving exchange rate.
   * @param {BotOptions} options Configuration options for the bot.
   */
  constructor(token, monobankAPI, privatbankAPI, options = {}) {
    super(token, {
      ...defaultOptions,
      ...options,
    });

    this._monobankAPI = monobankAPI;
    this._privatbankAPI = privatbankAPI;
  }

  /**
   * Initializes the bot and sets up message handlers.
   */
  init() {
    this._initKeyboard();

    this.onText(/(USD|EUR)/, async (msg, match) => {
      const currency = match[1];

      let message = '';

      // Trying to get exchage rates from APIs
      try {
        const exchangeRates = await Promise.all([
          this._monobankAPI.getExchangeRate(currency),
          this._privatbankAPI.getExchangeRate(currency),
        ]);

        message = ExchangeRateFormatter.getFormattedExchangeRateMessage(
          currency,
          exchangeRates
        );
      } catch (err) {
        // E.g. If Too Many Requests but cache is empty
        message = 'Internal error. Please, try again later.';
      }

      // Send final message
      try {
        await this.sendMessage(msg.chat.id, message, {
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
    this.onText(/\/start/, (msg) => {
      this.sendMessage(msg.chat.id, `Welcome to Exchange Rates bot!`, {
        reply_markup: {
          keyboard: [['Exchange rates']],
          resize_keyboard: true,
        },
      });
    });

    this.onText(new RegExp('Exchange rates'), (msg) => {
      this.sendMessage(msg.chat.id, 'Please, choose currency', {
        reply_markup: {
          keyboard: [['USD', 'EUR']],
          resize_keyboard: true,
        },
      });
    });
  }
}
