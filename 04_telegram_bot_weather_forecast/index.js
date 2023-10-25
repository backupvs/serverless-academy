import App from './App.js';

const token = process.env.BOT_TOKEN;
const openWeatherAPIKey = process.env.OPEN_WEATHER_API_KEY;

if (!token || !openWeatherAPIKey) {
  console.log(
    'Environment variable BOT_TOKEN and OPEN_WEATHER_API_KEY must be provided!'
  );
  process.exit(1);
}

const app = new App(token, openWeatherAPIKey, 'Kropyvnytskyi');

try {
  app.run();
} catch (err) {
  console.error('Error:', err.message);
}
