/**
 * WhatsApp Notification Adapter
 * Implements NotificationPort for WhatsApp messaging
 */
const NotificationPort = require('../../ports/NotificationPort');

class WhatsAppNotificationAdapter extends NotificationPort {
  constructor(whatsappMessageAdapter) {
    super();
    this.messageAdapter = whatsappMessageAdapter;
  }

  async sendTestNotification(chatId, testId, testTitle) {
    const message = `
✅ *Test Started: ${testTitle}*

Test ID: ${testId}
Total Questions: 25

To answer, simply type the letter (A, B, C, or D)

Example: A

Let's begin! 🚗
    `;
    return this.messageAdapter.sendMessage(chatId, message);
  }

  async sendResultNotification(chatId, result) {
    const passStatus = result.percentage >= 75 ? '✅ PASSED' : '❌ FAILED';
    const message = `
*TEST RESULTS*

${passStatus}

Score: ${result.score}/${result.totalQuestions}
Percentage: ${result.percentage}%

Test ID: ${result.testId}
Date: ${new Date(result.completedAt).toLocaleDateString()}

${result.percentage >= 75 ? 'Great job! 🎉' : 'Keep practicing! 💪'}
    `;
    return this.messageAdapter.sendMessage(chatId, message);
  }

  async sendQuestionNotification(chatId, question, questionNumber, total) {
    let message = `*Question ${questionNumber} of ${total}*\n\n`;
    message += `${question.questionText}\n\n`;

    if (question.options && Array.isArray(question.options)) {
      question.options.forEach((option, index) => {
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        message += `${letter}. ${option}\n`;
      });
    }

    if (question.hasImage && question.imageUrl) {
      await this.messageAdapter.sendMediaMessage(
        chatId,
        question.imageUrl,
        `Question ${questionNumber} image`
      );
    }

    return this.messageAdapter.sendMessage(chatId, message);
  }

  async sendMenuNotification(chatId) {
    const message = `
*🚗 Zimbabwe Driving School Bot 🚗*

Welcome! Choose an option:

1️⃣ - Start a test
2️⃣ - View my results
3️⃣ - Help

Type the number to continue.
    `;
    return this.messageAdapter.sendMessage(chatId, message);
  }

  async sendTestListNotification(chatId, tests) {
    let message = '*📋 Available Tests*\n\n';
    tests.forEach((test) => {
      message += `${test.testId}. ${test.title}\n`;
    });
    message += '\n*Type the test number to start.*';
    return this.messageAdapter.sendMessage(chatId, message);
  }

  async sendHelpNotification(chatId) {
    const message = `
*📚 How to Use the Bot*

1. *Start a Test*: Choose from tests 1-25, each with 25 questions
2. *Answer Questions*: Type the letter (A, B, C, or D) 
3. *View Results*: See your score and percentage
4. *Track Progress*: View all your test history

*Tips:*
- Read questions carefully
- Some questions have images
- You need 75% to pass
- Take your time!

For more help, type "help"
    `;
    return this.messageAdapter.sendMessage(chatId, message);
  }
}

module.exports = WhatsAppNotificationAdapter;
