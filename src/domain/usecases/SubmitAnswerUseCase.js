/**
 * Submit Answer Use Case
 * Records user's answer to a question
 */
class SubmitAnswerUseCase {
  constructor(testRepository, resultRepository, userRepository) {
    this.testRepository = testRepository;
    this.resultRepository = resultRepository;
    this.userRepository = userRepository;
  }

  async execute(userId, resultId, questionId, userAnswer) {
    try {
      // Get result
      const result = await this.resultRepository.getResultById(resultId);
      if (!result) {
        throw new Error(`Result ${resultId} not found`);
      }

      // Record answer
      result.recordAnswer(questionId, userAnswer);
      await this.resultRepository.save(result);

      // Get user for question progression
      const user = await this.userRepository.getUserById(userId);
      if (user && user.state === 'TAKING_TEST') {
        user.nextQuestion();
        await this.userRepository.save(user);
      }

      return {
        success: true,
        resultId: result.resultId,
        answersRecorded: Object.keys(result.answers).length,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = SubmitAnswerUseCase;
