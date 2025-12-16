/**
 * TestResult Entity
 * Records user's test attempt and answers
 */
class TestResult {
  constructor(userId, testId, userName) {
    this.resultId = `${userId}-${testId}-${Date.now()}`;
    this.userId = userId;
    this.testId = testId;
    this.userName = userName;
    this.answers = {}; // questionId -> userAnswer
    this.startedAt = new Date();
    this.completedAt = null;
    this.score = 0;
    this.totalQuestions = 0;
  }

  recordAnswer(questionId, userAnswer) {
    this.answers[questionId] = userAnswer;
  }

  getAnswer(questionId) {
    return this.answers[questionId];
  }

  calculateScore(testQuestions) {
    let correctCount = 0;
    this.totalQuestions = testQuestions.length;

    testQuestions.forEach((question) => {
      const userAnswer = this.answers[question.questionId];
      if (userAnswer && question.isAnswerCorrect(userAnswer)) {
        correctCount++;
      }
    });

    this.score = correctCount;
    this.completedAt = new Date();
    return {
      score: correctCount,
      total: this.totalQuestions,
      percentage: Math.round((correctCount / this.totalQuestions) * 100),
    };
  }

  getPercentage() {
    if (this.totalQuestions === 0) return 0;
    return Math.round((this.score / this.totalQuestions) * 100);
  }

  toJSON() {
    return {
      resultId: this.resultId,
      userId: this.userId,
      testId: this.testId,
      userName: this.userName,
      score: this.score,
      totalQuestions: this.totalQuestions,
      percentage: this.getPercentage(),
      startedAt: this.startedAt,
      completedAt: this.completedAt,
      answersCount: Object.keys(this.answers).length,
    };
  }
}

module.exports = TestResult;
