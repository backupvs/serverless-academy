import { MongoClient, Db } from 'mongodb';
import { mongoConfig } from '../configs/mongoConfig.js';

export default class Database {
  /** @type Db */
  db;

  /**
   * @private @type MongoClient
   */
  _client;

  constructor() {
    const uri = this._makeUri(
      mongoConfig.host,
      mongoConfig.port,
      mongoConfig.user,
      mongoConfig.password
    );
    this._client = new MongoClient(uri);
  }

  async init() {
    console.log('Connecting to Mongo...');
    await this._client.connect();
    console.log('Successfully connected to Mongo.');
    this.db = this._client.db(mongoConfig.database);
  }

  _makeUri(host, port, user, password) {
    return `mongodb://${user}:${password}@${host}:${port}`;
  }
}
