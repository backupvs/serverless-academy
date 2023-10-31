import App from './App.js';

const appOptions = {
  port: +process.env.PORT || 4000,
  host: process.env.HOST ?? 'localhost',
};

const app = new App(appOptions);
app.start();
