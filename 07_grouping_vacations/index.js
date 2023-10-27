import App from './App.js';

const app = new App('./data.json');
app.run().catch(console.error);
