## About app

Simple Telegram bot that allows you to retrieve 5 days weather forecast for Kropyvnytskyi for every 3 or 6 hours.

## Task

Write a bot that will give the user the weather forecast for a particular city. Choose the city according to your taste or where you live, it's not critical.

#### ❕Bot requirements

- The bot should be able to return a weather forecast for every 3 hours, or for every 6 hours at the request of the user.
- The menu structure should be represented by the buttons: "Forecast in Nice" ⇒ "at intervals of 3 hours" / "at intervals of 6 hours" (one button, after clicking on which a menu with two more buttons opens).

#### 🛠️Tools and APIs

- `OpenWeather API` ([API docs](https://openweathermap.org/api)). you should use this specific endpoint — [https://api.openweathermap.org/data/2.5/forecast?appid=](https://api.openweathermap.org/data/2.5/forecast?appid=).....
- `node-telegram-bot-api` to create your bot logic
- `Axios` to make API calls against OpenWeather API

## To start the application:

```bash

npm start

```

or

```bash

node src/index.js

```
