import 'reflect-metadata';
import App, { AppOptions } from './App';

const appOptions: AppOptions = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  hostname: process.env.HOSTNAME ?? 'localhost',
};

const app = new App(appOptions);
app.start();
