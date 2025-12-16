/**
 * Test Result Repository Port
 * Interface for test result data persistence
 */
class TestResultRepositoryPort {
  async getResultById(resultId) {
    throw new Error('getResultById must be implemented');
  }

  async getResultsByUserId(userId) {
    throw new Error('getResultsByUserId must be implemented');
  }

  async getResultsByTestId(testId) {
    throw new Error('getResultsByTestId must be implemented');
  }

  async save(result) {
    throw new Error('save must be implemented');
  }

  async delete(resultId) {
    throw new Error('delete must be implemented');
  }
}

module.exports = TestResultRepositoryPort;
