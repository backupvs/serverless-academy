import UserRepository from '../database/repositories/user.repository.js';

export default class MeService {
  /**
   * @param {UserRepository} userRepository
   */
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  /**
   * Get data of the current authorized user.
   *
   * @param {string} userId
   * @returns {Promise<{ email: string }>}
   */
  async getCurrentUserData(userId) {
    const userData = await this._userRepository.findById(userId);

    return { email: userData.email };
  }
}
