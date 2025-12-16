/**
 * Complete Test Use Case
 * Calculates results and finishes the test
 */
class CompleteTestUseCase {
  constructor(testRepository, resultRepository, userRepository) {
    this.testRepository = testRepository;
    this.resultRepository = resultRepository;
    this.userRepository = userRepository;
  }

  async execute(userId, resultId) {
    try {
      // Get result
      const result = await this.resultRepository.getResultById(resultId);
      if (!result) {
        throw new Error(`Result ${resultId} not found`);
      }

      // Get test
      const test = await this.testRepository.getTestById(result.testId);
      if (!test) {
        throw new Error(`Test ${result.testId} not found`);
      }

      // Calculate score
      const score = result.calculateScore(test.questions);

      // Save updated result
      await this.resultRepository.save(result);

      // Update user
      const user = await this.userRepository.getUserById(userId);
      if (user) {
        user.completeTest(result.testId);
        await this.userRepository.save(user);
      }

      return {
        success: true,
        result: result.toJSON(),
        score: score.score,
        total: score.total,
        percentage: score.percentage,
        passed: score.percentage >= 75, // Assuming 75% is passing
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = CompleteTestUseCase;
