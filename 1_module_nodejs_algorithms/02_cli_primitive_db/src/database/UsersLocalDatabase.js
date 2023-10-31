import fs from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @typedef {Object} User
 *
 * @property {string} name
 * @property {'male' | 'female'} gender
 * @property {number} age
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_FILE_PATH = join(__dirname, 'db.txt');

/**
 * Represents file database that has methods to read or create data.
 *
 * @class UsersLocalDatabase
 */
export default class UsersLocalDatabase {
  /**
   * Path to database TXT file
   *
   * @private
   * @type string
   */
  _filePath;

  /**
   * @param {string} filePath Path to database TXT file
   */
  constructor(filePath = DEFAULT_FILE_PATH) {
    this._filePath = filePath;
  }

  /**
   * Stringifies and appends user to a new line in text file.
   *
   * @param {User} user Object with user properties to add to DB
   */
  async createUser(user) {
    let fileHandle;
    try {
      fileHandle = await this._getFileHandle();
      const stat = await fileHandle.stat();

      // Add stringified user on a new line except first
      const data = `${stat.size > 0 ? '\n' : ''}${JSON.stringify(user)}`;

      await fileHandle.appendFile(data);
    } finally {
      await this._closeFileHandle(fileHandle);
    }
  }

  /**
   * Gets users from DB and parses them to object.
   *
   * @returns {Promise<User[]>}
   */
  async getUsers() {
    let fileHandle;
    try {
      fileHandle = await this._getFileHandle();
      const fileContent = await fileHandle.readFile('utf-8');

      return fileContent.split('\n').map((el) => JSON.parse(el));
    } catch (err) {
      console.log('Error reading file:', err);

      return [];
    } finally {
      await this._closeFileHandle(fileHandle);
    }
  }

  /**
   * Finds user by name from DB.
   *
   * @param {string} nameToFind
   * @returns {Promise<User | null>}
   */
  async getUserByName(nameToFind) {
    const users = await this.getUsers();
    const foundUser = users.find(
      (user) => user.name.toLowerCase() === nameToFind.toLowerCase()
    );

    return foundUser || null;
  }

  /**
   * Opens file for appending.
   *
   * @returns {Promise<fs.FileHandle>} File descriptor
   */
  async _getFileHandle() {
    return fs.open(this._filePath, 'a+');
  }

  /**
   * Closes file.
   *
   * @param {fs.FileHandle} fileHandle
   */
  async _closeFileHandle(fileHandle) {
    return fileHandle?.close(this._filePath);
  }
}
