import AppBotCommand from './AppBotCommand.js';
import AppBot from '../bot/AppBot.js';
import { Argument } from 'commander';

/**
 * Implementation of AppBotCommand to send photo to destination chat.
 *
 * @class SendPhotoAppBotCommand
 */
export default class SendPhotoAppBotCommand extends AppBotCommand {
  _name = 'send-photo';
  _description = 'sends command for bot to send you a photo';
  _argument = new Argument('[path]', 'path to photo for bot to send you').argRequired();

  /**
   * Sends photo to destination chat by specified bot.
   *
   * @param {AppBot} bot Bot that sends message.
   * @param {string} path Path to photo for bot to send.
   * @returns {Promise<void>}
   */
  async action(bot, path) {
    await bot.sendPhotoToChat(path);
  }
}
