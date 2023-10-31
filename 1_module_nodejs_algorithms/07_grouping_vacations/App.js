import utils from './utils.js';
import User from './User.js';

export default class App {
  /**
   * Path to JSON file.
   *
   * @private
   * @type string
   */
  _filePath;

  /**
   * @param {string} filePath Path to JSON file.
   */
  constructor(filePath) {
    this._filePath = filePath;
  }

  async run() {
    const vacations = await utils.readJSON(this._filePath);
    const users = this._mapToUsers(vacations);
    utils.writeJSON(users, this._filePath);
  }

  _mapToUsers(vacations) {
    // Stores users with user ID as key
    const users = {};

    // Iteration through vacations
    for (let vacation of vacations) {
      const { startDate, endDate, user } = vacation;

      if (!users[user._id]) {
        // Add new user if it is not exist by its ID as key
        users[user._id] = new User(user._id, user.name);
      }

      // Push current vacation to new or existing user
      users[user._id].addVacation(startDate, endDate);
    }

    return Object.values(users);
  }
}
