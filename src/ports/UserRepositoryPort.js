/**
 * User Repository Port
 * Interface for user data persistence
 */
class UserRepositoryPort {
  async getUserById(userId) {
    throw new Error('getUserById must be implemented');
  }

  async getUserByPhoneNumber(phoneNumber) {
    throw new Error('getUserByPhoneNumber must be implemented');
  }

  async getAllUsers() {
    throw new Error('getAllUsers must be implemented');
  }

  async save(user) {
    throw new Error('save must be implemented');
  }

  async delete(userId) {
    throw new Error('delete must be implemented');
  }
}

module.exports = UserRepositoryPort;
