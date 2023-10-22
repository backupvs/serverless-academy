## About app

Simple telegram bot that can act as notes or notepad when you need to save something urgently from the console.

## Tools and libraries

- [commander](https://www.npmjs.com/package/commander) - this library helps you organize your app with commands and command-specific options.
- [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api) - just a wrapper on top of Telegram Bot API.

## Commands

Here is the list of commands that app support:

#### Send a message

```bash
$ node index.js send-message 'Your message'
```

The result of executing this command is the appearance of your message in your Telegram bot. After it has been executed, the CLI terminates the process itself to allow you to enter the next command.

#### Send a photo

```bash
$ node index.js send-photo '/path/to/the/photo.png'
```

The result of this command is a photo sent to the Telegram bot from your PC. After it has been executed, the CLI terminates the process itself to allow you to enter the next command.

#### Help

```bash
$ node index.js --help
```

This command is designed to provide you with information about all the available commands supported by the app.
