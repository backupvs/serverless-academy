## About app

Simple Telegram bot that allows you to retrieve exchange rates for USD and EUR to UAH.

## Task

Create a bot for getting the exchange rate.

#### ❕Bot requirements

- The bot must have two buttons that will allow you to find out the USD and EUR exchange rates. Use PrivatBank and Monobank APIs for that.
- Keep in mind that Monobank does not allow you to make requests more than once every 60 seconds, while your bot may be used by dozens of people. Implement this logic, so the bot will not return an error, but will provide actual exchange rates. For example, you can cache results: take a look at [node-cache](https://www.npmjs.com/package/node-cache) library.

## To start the application:

```bash

npm start

```

or

```bash

node src/index.js

```
