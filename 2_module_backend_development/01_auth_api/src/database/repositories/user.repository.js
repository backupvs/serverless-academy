/**
 * @typedef {Object} User
 *
 * @property {string} id
 * @property {string} email
 * @property {string} password
 * @property {string} refreshToken
 */

export default class UserRepository {
  /** @private */
  _dataSource;

  constructor(dataSource) {
    this._dataSource = dataSource;
  }

  /**
   * @param {string} id
   * @returns {Promise<User | null>} A user object if found, otherwise null.
   */
  async findById(id) {
    const result = await this._dataSource.query('SELECT * from "user" WHERE id = $1', [
      id,
    ]);

    return result.rows[0] || null;
  }

  /**
   * @param {string} email
   * @returns {Promise<User | null>} A user object if found, otherwise null.
   */
  async findByEmail(email) {
    const result = await this._dataSource.query('SELECT * from "user" WHERE email = $1', [
      email,
    ]);

    return result.rows[0] || null;
  }

  /**
   * @param {{ email: string, password: string }} createUserDto
   * @returns {Promise<string | null>} ID of the created user, otherwise null.
   */
  async create(createUserDto) {
    const { email, password } = createUserDto;

    const result = await this._dataSource.query(
      `INSERT INTO "user" (id, email, password, refresh_token) 
        VALUES (uuid_generate_v4(), $1, $2, null)
        RETURNING id;`,
      [email, password]
    );

    return result.rows[0].id;
  }

  /**
   * @param {string} id
   * @param {string} newRefreshToken
   * @returns {Promise<{ id: string } | null>} ID of the user after updating, otherwise null.
   */
  async updateRefreshTokenById(id, newRefreshToken) {
    const result = await this._dataSource.query(
      `UPDATE "user"
        SET refresh_token = $1
        WHERE id = $2
        RETURNING id;`,
      [newRefreshToken, id]
    );

    return result.rows[0];
  }
}
