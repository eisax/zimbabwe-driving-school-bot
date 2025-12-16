/**
 * Bot Command Handler
 * Processes user messages and routes them to appropriate handlers
 */

class BotCommandHandler {
  constructor(
    testRepository,
    userRepository,
    resultRepository,
    whatsappAdapter,
    notificationAdapter
  ) {
    this.testRepository = testRepository;
    this.userRepository = userRepository;
    this.resultRepository = resultRepository;
    this.whatsappAdapter = whatsappAdapter;
    this.notificationAdapter = notificationAdapter;

    // Use cases
    const StartTestUseCase = require('../../domain/usecases/StartTestUseCase');
    const SubmitAnswerUseCase = require('../../domain/usecases/SubmitAnswerUseCase');
    const CompleteTestUseCase = require('../../domain/usecases/CompleteTestUseCase');
    const GetAllTestsUseCase = require('../../domain/usecases/GetAllTestsUseCase');
    const GetTestQuestionUseCase = require('../../domain/usecases/GetTestQuestionUseCase');
    const GetUserResultsUseCase = require('../../domain/usecases/GetUserResultsUseCase');

    this.startTestUseCase = new StartTestUseCase(
      this.testRepository,
      this.userRepository,
      this.resultRepository
    );
    this.submitAnswerUseCase = new SubmitAnswerUseCase(
      this.testRepository,
      this.resultRepository,
      this.userRepository
    );
    this.completeTestUseCase = new CompleteTestUseCase(
      this.testRepository,
      this.resultRepository,
      this.userRepository
    );
    this.getAllTestsUseCase = new GetAllTestsUseCase(this.testRepository);
    this.getTestQuestionUseCase = new GetTestQuestionUseCase(this.testRepository);
    this.getUserResultsUseCase = new GetUserResultsUseCase(this.resultRepository);
  }

  async handleMessage(message) {
    try {
      const chatId = message.from;
      const userName = message._data?.notifyName || 'User';
      const userInput = message.body.trim();

      // Get or create user
      let user = await this.userRepository.getUserById(chatId);
      if (!user) {
        const User = require('../../domain/entities/User');
        user = new User(chatId, userName, chatId);
        await this.userRepository.save(user);
      }

      // Route based on user state and input
      if (user.state === 'MENU') {
        await this.handleMenuInput(chatId, userInput, user);
      } else if (user.state === 'TAKING_TEST') {
        await this.handleTestAnswer(chatId, userInput, user);
      } else if (user.state === 'SELECTING_TEST') {
        await this.handleTestSelection(chatId, userInput, user);
      } else {
        await this.showMainMenu(chatId);
      }
    } catch (error) {
      console.error('Error handling message:', error);
      await this.whatsappAdapter.sendMessage(message.from, 'Sorry, an error occurred. Please try again.');
    }
  }

  async handleMenuInput(chatId, input, user) {
    const command = input.toLowerCase();

    if (command === '1') {
      // Start test - show test list
      user.state = 'SELECTING_TEST';
      await this.userRepository.save(user);
      await this.showTestList(chatId);
    } else if (command === '2') {
      // View results
      await this.showUserResults(chatId);
    } else if (command === '3' || command === 'help') {
      // Help
      await this.notificationAdapter.sendHelpNotification(chatId);
    } else {
      await this.whatsappAdapter.sendMessage(chatId, 'Invalid option. Please reply with 1, 2, or 3.');
      await this.showMainMenu(chatId);
    }
  }

  async handleTestSelection(chatId, input, user) {
    const testId = input.trim();

    // Validate test ID (1-25)
    if (!/^\d+$/.test(testId) || parseInt(testId) < 1 || parseInt(testId) > 25) {
      await this.whatsappAdapter.sendMessage(
        chatId,
        'Invalid test number. Please enter a number between 1 and 25.'
      );
      return;
    }

    // Start the test
    const result = await this.startTestUseCase.execute(chatId, user.name, testId);

    if (result.success) {
      user = await this.userRepository.getUserById(chatId);
      user.state = 'TAKING_TEST';
      await this.userRepository.save(user);

      await this.notificationAdapter.sendTestNotification(
        chatId,
        testId,
        result.test.title
      );

      // Send first question
      await this.sendQuestion(chatId, testId, 0, result.test.totalQuestions);
    } else {
      await this.whatsappAdapter.sendMessage(
        chatId,
        `Error starting test: ${result.error}`
      );
    }
  }

  async handleTestAnswer(chatId, input, user) {
    const answer = input.toUpperCase().trim();

    // Validate answer format (A-D)
    if (!/^[A-D]$/.test(answer)) {
      await this.whatsappAdapter.sendMessage(
        chatId,
        'Please reply with A, B, C, or D only.'
      );
      return;
    }

    // Get current result
    const results = await this.resultRepository.getResultsByUserId(chatId);
    const currentResult = results.find((r) => r.testId === user.currentTest);

    if (!currentResult) {
      await this.whatsappAdapter.sendMessage(chatId, 'Test session not found. Starting over...');
      user.state = 'MENU';
      await this.userRepository.save(user);
      await this.showMainMenu(chatId);
      return;
    }

    // Get current question
    const test = await this.testRepository.getTestById(user.currentTest);
    const currentQuestion = test.getQuestion(user.currentQuestionIndex);

    if (!currentQuestion) {
      await this.whatsappAdapter.sendMessage(chatId, 'Question not found.');
      return;
    }

    // Record answer
    const submitResult = await this.submitAnswerUseCase.execute(
      chatId,
      currentResult.resultId,
      currentQuestion.questionId,
      answer
    );

    if (submitResult.success) {
      user = await this.userRepository.getUserById(chatId);

      // Check if test is complete (all 25 questions answered)
      if (user.currentQuestionIndex >= 25) {
        // Complete test and show results
        const completeResult = await this.completeTestUseCase.execute(
          chatId,
          currentResult.resultId
        );

        if (completeResult.success) {
          await this.notificationAdapter.sendResultNotification(
            chatId,
            completeResult.result
          );

          user = await this.userRepository.getUserById(chatId);
          user.state = 'MENU';
          await this.userRepository.save(user);

          await this.whatsappAdapter.sendMessage(
            chatId,
            '\nWhat would you like to do next? (1, 2, or 3)'
          );
          await this.showMainMenu(chatId);
        }
      } else {
        // Send next question
        await this.sendQuestion(
          chatId,
          user.currentTest,
          user.currentQuestionIndex,
          test.getTotalQuestions()
        );
      }
    } else {
      await this.whatsappAdapter.sendMessage(
        chatId,
        `Error recording answer: ${submitResult.error}`
      );
    }
  }

  async sendQuestion(chatId, testId, questionIndex, totalQuestions) {
    const result = await this.getTestQuestionUseCase.execute(testId, questionIndex);

    if (result.success) {
      const question = result.question;
      let message = `*Question ${result.questionNumber}/${totalQuestions}*\n\n`;
      message += `${question.questionText}\n\n`;

      if (question.options && Array.isArray(question.options)) {
        question.options.forEach((option, index) => {
          const letter = String.fromCharCode(65 + index);
          message += `${letter}. ${option}\n`;
        });
      }

      // If question has image, send it separately
      if (question.hasImage && question.imageUrl) {
        await this.whatsappAdapter.sendMediaMessage(
          chatId,
          question.imageUrl,
          `Question ${result.questionNumber}`
        );
      }

      await this.whatsappAdapter.sendMessage(
        chatId,
        message + '\n*Reply with: A, B, C, or D*'
      );
    } else {
      await this.whatsappAdapter.sendMessage(chatId, `Error loading question: ${result.error}`);
    }
  }

  async showMainMenu(chatId) {
    await this.notificationAdapter.sendMenuNotification(chatId);
  }

  async showTestList(chatId) {
    const result = await this.getAllTestsUseCase.execute();

    if (result.success) {
      const tests = result.tests.map((t) => t.title);
      await this.notificationAdapter.sendTestListNotification(chatId, result.tests);
    } else {
      await this.whatsappAdapter.sendMessage(
        chatId,
        `Error loading tests: ${result.error}`
      );
    }
  }

  async showUserResults(chatId) {
    const result = await this.getUserResultsUseCase.execute(chatId);

    if (result.success) {
      if (result.total === 0) {
        await this.whatsappAdapter.sendMessage(
          chatId,
          'You have not completed any tests yet. Start by choosing option 1.'
        );
      } else {
        let message = '*📊 Your Test Results*\n\n';
        result.results.forEach((r, idx) => {
          message += `${idx + 1}. Test ${r.testId}\n`;
          message += `   Score: ${r.score}/${r.totalQuestions}\n`;
          message += `   Percentage: ${r.percentage}%\n`;
          message += `   Status: ${r.percentage >= 75 ? '✅ Passed' : '❌ Failed'}\n`;
          message += `   Date: ${new Date(r.completedAt).toLocaleDateString()}\n\n`;
        });
        await this.whatsappAdapter.sendMessage(chatId, message);
      }
    } else {
      await this.whatsappAdapter.sendMessage(
        chatId,
        `Error loading results: ${result.error}`
      );
    }

    // Return to menu
    await this.whatsappAdapter.sendMessage(
      chatId,
      'What would you like to do next? (1, 2, or 3)'
    );
    await this.showMainMenu(chatId);
  }
}

module.exports = BotCommandHandler;
