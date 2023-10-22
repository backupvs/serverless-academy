import TelegramBot from 'node-telegram-bot-api';
import { cyanBold } from '../utils.js';

/**
 * @typedef {Object} AppOptions
 *
 * @property {boolean} polling
 */
const defaultOptions = {
  polling: false,
};

/**
 * Extends the TelegramBot, adding custom fields for chat ID and username during initialization.
 *
 * @class AppBot
 */
export default class AppBot extends TelegramBot {
  /**
   * @private
   * @type string
   */
  _destinationChatId;

  /**
   * @private
   * @type string
   */
  _username;

  constructor(token, options = {}) {
    super(token, {
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * Initialize the bot by retrieving the chat ID and username.
   */
  async init() {
    const updates = await this.getUpdates({ limit: 1 });

    // Try to get chat ID explicitly from environment variables.
    // If not found then from bot updates.
    this._destinationChatId = process.env.CHAT_ID || updates[0]?.message?.chat.id;
    this._username = (await this.getMe()).username;

    if (!this._destinationChatId) {
      throw new Error(
        `Can't get chat ID. Type /start to ${cyanBold(this._username)} ` +
          `or explicitly add chat ID to ${cyanBold('CHAT_ID')} environment variable`
      );
    }
  }

  /**
   * Send a text message to the destination chat.
   *
   * @param {string} text Text message to send.
   */
  async sendMessageToChat(text) {
    return this.sendMessage(this._destinationChatId, text);
  }

  /**
   * Send an image to the destination chat.
   *
   * @param {string} path Path to the image file to send.
   */
  async sendPhotoToChat(path) {
    return this.sendPhoto(this._destinationChatId, path);
  }
}
