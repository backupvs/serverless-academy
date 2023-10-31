import App from './App.js';

const token = process.env.BOT_TOKEN;

if (!token) {
  console.log('Environment variable BOT_TOKEN must be provided!');
  process.exit(1);
}

const app = new App(token);

try {
  app.run();
} catch (err) {
  console.error('Error:', err.message);
}
