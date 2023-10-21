import App from './App.js';
import SortAlphabeticallyCommand from './commands/SortAlphabeticallyCommand.js';
import SortNumbersAscCommand from './commands/SortNumbersAscCommand.js';
import SortNumbersDescCommand from './commands/SortNumbersDescCommand.js';

const app = new App([
  new SortAlphabeticallyCommand(),
  new SortNumbersAscCommand(),
  new SortNumbersDescCommand(),
]);
app.run();
