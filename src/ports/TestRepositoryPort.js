/**
 * Test Repository Port
 * Interface for test data persistence
 */
class TestRepositoryPort {
  async getTestById(testId) {
    throw new Error('getTestById must be implemented');
  }

  async getAllTests() {
    throw new Error('getAllTests must be implemented');
  }

  async save(test) {
    throw new Error('save must be implemented');
  }

  async delete(testId) {
    throw new Error('delete must be implemented');
  }
}

module.exports = TestRepositoryPort;
