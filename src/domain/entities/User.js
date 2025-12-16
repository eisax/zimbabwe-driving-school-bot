/**
 * User Entity
 * Represents a user of the driving school bot
 */
class User {
  constructor(userId, name, phoneNumber) {
    this.userId = userId;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.testHistory = []; // Array of testIds
    this.currentTest = null;
    this.currentQuestionIndex = 0;
    this.createdAt = new Date();
    this.state = 'MENU'; // MENU, SELECTING_TEST, TAKING_TEST, VIEWING_RESULTS
  }

  startTest(testId) {
    this.currentTest = testId;
    this.currentQuestionIndex = 0;
    this.state = 'TAKING_TEST';
  }

  nextQuestion() {
    this.currentQuestionIndex++;
  }

  completeTest(testId) {
    if (!this.testHistory.includes(testId)) {
      this.testHistory.push(testId);
    }
    this.currentTest = null;
    this.currentQuestionIndex = 0;
    this.state = 'MENU';
  }

  getCurrentQuestion() {
    if (this.state === 'TAKING_TEST') {
      return this.currentQuestionIndex;
    }
    return null;
  }

  getProgress() {
    return {
      testId: this.currentTest,
      currentQuestion: this.currentQuestionIndex,
      state: this.state,
    };
  }

  toJSON() {
    return {
      userId: this.userId,
      name: this.name,
      phoneNumber: this.phoneNumber,
      testsAttempted: this.testHistory.length,
      createdAt: this.createdAt,
      state: this.state,
    };
  }
}

module.exports = User;
