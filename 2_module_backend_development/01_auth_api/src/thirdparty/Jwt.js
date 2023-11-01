import jwt from 'jsonwebtoken';

/**
 * Utility class for working with JSON Web Tokens (JWT).
 */
export default class Jwt {
  constructor() {}

  static async signAccessToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_TTL },
        (err, encoded) => {
          if (err) {
            reject(err);
          }
          resolve(encoded);
        }
      );
    });
  }

  static async signRefreshToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, (err, encoded) => {
        if (err) {
          reject(err);
        }
        resolve(encoded);
      });
    });
  }

  static async verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, encoded) => {
        if (err) {
          reject(err);
        }
        resolve(encoded);
      });
    });
  }

  static async verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, encoded) => {
        if (err) {
          reject(err);
        }
        resolve(encoded);
      });
    });
  }
}
