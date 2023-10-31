import AppBotCommand from './AppBotCommand.js';
import AppBot from '../bot/AppBot.js';
import { Argument } from 'commander';

/**
 * Implementation of AppBotCommand to send message to destination chat.
 *
 * @class SendMessageAppBotCommand
 */
export default class SendMessageAppBotCommand extends AppBotCommand {
  _name = 'send-message';
  _description = 'sends command for bot to send you a message';
  _argument = new Argument('[message]', 'message for bot to send you').argRequired();

  /**
   * Send message to destination chat by specified bot.
   *
   * @param {AppBot} bot Bot that sends message.
   * @param {string} message Message to send.
   * @returns {Promise<void>}
   */
  async action(bot, message) {
    await bot.sendMessageToChat(message);
  }
}
