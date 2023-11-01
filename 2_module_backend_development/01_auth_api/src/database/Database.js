import pg from 'pg';
import { postgresConfig } from '../configs/postgresConfig.js';

export default class Database {
  pool;

  constructor() {
    this.pool = new pg.Pool(postgresConfig);
  }

  // A parody of migration
  async init() {
    return this.pool.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS "user" (
        id UUID PRIMARY KEY NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        refresh_token VARCHAR(255)
      );`
    );
  }
}
