/**
 * Question Entity
 * Represents a driving theory question with optional image
 */
class Question {
  constructor(questionId, questionText, options, correctAnswer, imageUrl = null) {
    this.questionId = questionId;
    this.questionText = questionText;
    this.options = options; // Array of strings [A, B, C, D]
    this.correctAnswer = correctAnswer; // Index 0-3 or letter A-D
    this.imageUrl = imageUrl; // Optional image URL
    this.createdAt = new Date();
  }

  hasImage() {
    return this.imageUrl !== null && this.imageUrl !== undefined;
  }

  isAnswerCorrect(userAnswer) {
    const normalizedUserAnswer = this.normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = this.normalizeAnswer(this.correctAnswer);
    return normalizedUserAnswer === normalizedCorrectAnswer;
  }

  normalizeAnswer(answer) {
    if (typeof answer === 'number') {
      return String.fromCharCode(65 + answer); // Convert 0 to 'A', 1 to 'B', etc.
    }
    return String(answer).toUpperCase();
  }

  toJSON() {
    return {
      questionId: this.questionId,
      questionText: this.questionText,
      options: this.options,
      imageUrl: this.imageUrl,
      hasImage: this.hasImage(),
    };
  }
}

module.exports = Question;
