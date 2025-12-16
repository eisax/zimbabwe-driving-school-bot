/**
 * Get Test Question Use Case
 * Retrieves a specific question from a test
 */
class GetTestQuestionUseCase {
  constructor(testRepository) {
    this.testRepository = testRepository;
  }

  async execute(testId, questionIndex) {
    try {
      const test = await this.testRepository.getTestById(testId);
      if (!test) {
        throw new Error(`Test ${testId} not found`);
      }

      const question = test.getQuestion(questionIndex);
      if (!question) {
        throw new Error(`Question ${questionIndex} not found in test ${testId}`);
      }

      return {
        success: true,
        question: question.toJSON(),
        questionNumber: questionIndex + 1,
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

module.exports = GetTestQuestionUseCase;
