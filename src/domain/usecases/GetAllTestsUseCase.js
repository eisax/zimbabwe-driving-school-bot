/**
 * Get All Tests Use Case
 * Retrieves list of all available tests
 */
class GetAllTestsUseCase {
  constructor(testRepository) {
    this.testRepository = testRepository;
  }

  async execute() {
    try {
      const tests = await this.testRepository.getAllTests();
      return {
        success: true,
        tests: tests.map((test) => test.toJSON()),
        total: tests.length,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = GetAllTestsUseCase;
