/**
 * Notification Port
 * Interface for sending notifications
 */
class NotificationPort {
  async sendTestNotification(chatId, testId, testTitle) {
    throw new Error('sendTestNotification must be implemented');
  }

  async sendResultNotification(chatId, result) {
    throw new Error('sendResultNotification must be implemented');
  }

  async sendQuestionNotification(chatId, question, questionNumber, total) {
    throw new Error('sendQuestionNotification must be implemented');
  }
}

module.exports = NotificationPort;
