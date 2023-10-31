import App from './App.js';

const app = new App('./files');

console.time('App');
app.run().then(() => console.timeEnd('App'));
