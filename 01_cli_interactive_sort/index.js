import App from './App.js';
import SortAlphabeticallyCommand from './commands/SortAlphabeticallyCommand.js';
import SortNumbersAscCommand from './commands/SortNumbersAscCommand.js';
import SortNumbersDescCommand from './commands/SortNumbersDescCommand.js';
import SortWordsByLengthCommand from './commands/SortWordsByLengthCommand.js';

const app = new App([
  new SortAlphabeticallyCommand(),
  new SortNumbersAscCommand(),
  new SortNumbersDescCommand(),
  new SortWordsByLengthCommand(),
]);
app.run();
