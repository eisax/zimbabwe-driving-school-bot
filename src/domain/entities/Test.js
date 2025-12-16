/**
 * Test Entity
 * Represents a driving theory test with 25 questions
 */
class Test {
  constructor(testId, title, description, questions = []) {
    this.testId = testId;
    this.title = title;
    this.description = description;
    this.questions = questions;
    this.totalQuestions = 25;
  }

  addQuestion(question) {
    if (this.questions.length < this.totalQuestions) {
      this.questions.push(question);
      return true;
    }
    return false;
  }

  getQuestion(questionIndex) {
    if (questionIndex >= 0 && questionIndex < this.questions.length) {
      return this.questions[questionIndex];
    }
    return null;
  }

  getTotalQuestions() {
    return this.questions.length;
  }

  isComplete() {
    return this.questions.length === this.totalQuestions;
  }

  toJSON() {
    return {
      testId: this.testId,
      title: this.title,
      description: this.description,
      totalQuestions: this.getTotalQuestions(),
    };
  }
}

module.exports = Test;
