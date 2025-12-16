/**
 * Start Test Use Case
 * Handles the logic for starting a test
 */
class StartTestUseCase {
  constructor(testRepository, userRepository, resultRepository) {
    this.testRepository = testRepository;
    this.userRepository = userRepository;
    this.resultRepository = resultRepository;
  }

  async execute(userId, userName, testId) {
    try {
      // Retrieve test
      const test = await this.testRepository.getTestById(testId);
      if (!test) {
        throw new Error(`Test ${testId} not found`);
      }

      // Get or create user
      let user = await this.userRepository.getUserById(userId);
      if (!user) {
        const User = require('../entities/User');
        user = new User(userId, userName, userId);
        await this.userRepository.save(user);
      }

      // Create test result
      const TestResult = require('../entities/TestResult');
      const result = new TestResult(userId, testId, userName);
      await this.resultRepository.save(result);

      // Update user state
      user.startTest(testId);
      await this.userRepository.save(user);

      return {
        success: true,
        test: test.toJSON(),
        resultId: result.resultId,
        currentQuestion: 1,
        totalQuestions: test.getTotalQuestions(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = StartTestUseCase;
