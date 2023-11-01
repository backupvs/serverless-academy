import HttpError from '../errors/HttpError.js';
import httpCodes from '../errors/httpCodes.js';
import UserRepository from '../database/repositories/user.repository.js';
import Jwt from '../thirdparty/Jwt.js';
import bcrypt from 'bcrypt';

/**
 * @typedef {Object} SignInDto
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} SignUpDto
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} AuthResponseObject
 * @property {string} id
 * @property {string} accessToken
 * @property {string} refreshToken
 */

export default class AuthService {
  /**
   * @private @type UserRepository
   */
  _userRepository;

  /**
   * @param {UserRepository} userRepository
   */
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  /**
   * @param {SignInDto} signInDto
   * @returns {Promise<AuthResponseObject>}
   */
  async signIn(signInDto) {
    const user = await this._userRepository.findByEmail(signInDto.email);

    // Find user then compare password hash
    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new HttpError(httpCodes.NotFound, 'Invalid email or password');
    }

    // Create tokens and update refresh token of current user in DB
    const accessToken = await Jwt.signAccessToken({ userId: user.id });
    const refreshToken = await Jwt.signRefreshToken({ userId: user.id });
    await this._userRepository.updateRefreshTokenById(user.id, refreshToken);

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }

  /**
   * @param {SignUpDto} signUpDto
   * @returns {Promise<AuthResponseObject>}
   */
  async signUp(signUpDto) {
    const user = await this._userRepository.findByEmail(signUpDto.email);
    if (user) {
      throw new HttpError(httpCodes.Conflict, 'User with this email already exist');
    }

    // Hash password and create new user
    const passwordHash = await bcrypt.hash(signUpDto.password, 10);
    const createdId = await this._userRepository.create({
      email: signUpDto.email,
      password: passwordHash,
    });

    // Create tokens
    const refreshToken = await Jwt.signRefreshToken({
      userId: createdId.id,
    });
    const accessToken = await Jwt.signAccessToken({ userId: createdId.id });

    // Add refresh token to DB with created user ID as payload
    await this._userRepository.updateRefreshTokenById(createdId.id, refreshToken);

    return {
      id: createdId.id,
      refreshToken,
      accessToken,
    };
  }
}
