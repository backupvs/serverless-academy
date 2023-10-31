import App from './App.js';
import SendMessageAppBotCommand from './commands/SendMessageAppBotCommand.js';
import SendPhotoAppBotCommand from './commands/SendPhotoAppBotCommand.js';

// Disable transfered files content-type deprecation warning
process.env.NTBA_FIX_350 = true;

const token = process.env.BOT_TOKEN;

if (!token) {
  console.log('Environment variable BOT_TOKEN must be provided!');
  process.exit(1);
}

const commands = [new SendMessageAppBotCommand(), new SendPhotoAppBotCommand()];
const app = new App(token, commands);

app.run().catch((err) => console.error('Error:', err.message));
