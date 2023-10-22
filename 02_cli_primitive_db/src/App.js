import UsersLocalDatabase from './database/UsersLocalDatabase.js';
import inquirer from 'inquirer';
import { isIntegerString } from './utils.js';

const CREATE_USER_QUESTIONS = [
  {
    type: 'input',
    name: 'name',
    message: `Enter the user's name. To cancel press ENTER:`,
  },
  {
    type: 'list',
    name: 'gender',
    message: `Choose user's gender:`,
    choices: ['male', 'female'],
    when: (answers) => answers.name !== '',
  },
  {
    type: 'number',
    name: 'age',
    message: `Enter the user's age:`,
    validate: (input) => isIntegerString(input) || 'Age must be a number',
    when: (answers) => answers.name !== '',
  },
];

const FIND_USER_QUESTIONS = [
  {
    type: 'confirm',
    name: 'confirmed',
    message: `Would you like to search user in DB?`,
  },
  {
    type: 'input',
    name: 'nameToFind',
    message: `Enter the user's name that you want to find in DB:`,
    when: (answers) => answers.confirmed,
  },
];

export default class App {
  /**
   * Instance of database to perform operations.
   *
   * @private
   * @type UsersLocalDatabase
   */
  _db;

  /**
   * @param {string} dbFilePath Path to database TXT file
   */
  constructor(dbFilePath) {
    this._db = new UsersLocalDatabase(dbFilePath);
  }

  /**
   * The main loop of the app, in which the user is prompted
   * for input data to add to database.
   * User is also prompted for a user's name to search for
   * if he haven't specified name on creating stage.
   */
  async run() {
    // Keep asking to create new users until name is empty
    while (true) {
      const userToAdd = await this._askUserData(CREATE_USER_QUESTIONS);
      if (!userToAdd) break;
      await this._db.createUser(userToAdd);
    }

    // Search for a user in the database if the last created user's name is empty
    const { nameToFind } = await inquirer.prompt(FIND_USER_QUESTIONS);
    if (!nameToFind) return;

    const foundUser = await this._db.getUserByName(nameToFind);

    if (!foundUser) {
      return console.log(`User with name "${nameToFind}" was not found.`);
    }

    console.log(`User ${nameToFind} was found.`);
    console.log(foundUser);
  }

  /**
   * Prompts user specified questions and returns collected data.
   */
  async _askUserData(questions) {
    const userData = await inquirer.prompt(questions);
    userData.name = userData.name.trim();
    if (!userData.name) return null;

    return userData;
  }
}
