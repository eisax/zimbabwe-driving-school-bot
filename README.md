# Zimbabwe Driving School WhatsApp Bot

A comprehensive WhatsApp bot for Zimbabwe driving school theory tests, built with **hexagonal architecture** (ports and adapters pattern).

## Features

✅ **25 Different Tests** - Each with 25 questions  
✅ **Test Management** - Users can select and take any test from 1-25  
✅ **Question Support** - Text-based and image-based questions  
✅ **Result Tracking** - Records all test attempts and scores  
✅ **Performance Analytics** - Shows percentage, pass/fail status  
✅ **User History** - Displays all previous test results  
✅ **Hexagonal Architecture** - Clean separation of concerns with ports and adapters  

## Architecture

The application uses **Hexagonal Architecture** (Ports and Adapters):

```
Domain Layer (Core Business Logic)
├── Entities (Test, Question, User, TestResult)
└── Use Cases (StartTest, SubmitAnswer, CompleteTest, etc.)

Ports (Interfaces)
├── TestRepositoryPort
├── UserRepositoryPort
├── TestResultRepositoryPort
├── WhatsAppMessagePort
└── NotificationPort

Adapters (Implementations)
├── Inbound Adapters (WhatsApp, Bot Handler)
└── Outbound Adapters (SQLite Repositories)
```

This architecture provides:
- 🔌 **Decoupling** - Domain logic independent from frameworks
- 🧪 **Testability** - Easy to mock dependencies
- 🔄 **Flexibility** - Easy to swap implementations
- 📦 **Scalability** - Clean layer separation

## Project Structure

```
/src
├── domain/
│   ├── entities/          # Core business entities
│   │   ├── Test.js
│   │   ├── Question.js
│   │   ├── User.js
│   │   └── TestResult.js
│   └── usecases/          # Application logic
│       ├── StartTestUseCase.js
│       ├── SubmitAnswerUseCase.js
│       ├── CompleteTestUseCase.js
│       └── ...
├── ports/                 # Interface definitions
│   ├── TestRepositoryPort.js
│   ├── UserRepositoryPort.js
│   ├── TestResultRepositoryPort.js
│   ├── WhatsAppMessagePort.js
│   └── NotificationPort.js
├── adapters/
│   ├── inbound/          # Input adapters
│   │   ├── WhatsAppWebAdapter.js
│   │   ├── WhatsAppNotificationAdapter.js
│   │   └── BotCommandHandler.js
│   └── outbound/         # Output adapters
│       ├── SqliteTestRepositoryAdapter.js
│       ├── SqliteUserRepositoryAdapter.js
│       └── SqliteTestResultRepositoryAdapter.js
└── config/
    ├── config.js         # Application configuration
    └── ApplicationContainer.js  # Dependency injection

/data
├── testData.js           # Test questions database
└── driving_school.db     # SQLite database (auto-created)

index.js                   # Application entry point
```

## Installation

### Prerequisites
- Node.js 14+ 
- npm or yarn
- WhatsApp account

### Setup

1. **Clone/Download the project**
```bash
cd zimbabwe-driving-school-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env if needed (optional)
```

4. **Run the bot**
```bash
npm start
```

The bot will display a QR code. **Scan it with your WhatsApp phone** to authenticate.

## Usage

### User Commands

Once the bot is running and authenticated:

1. **Send any message** to the bot to start
2. **Choose an option:**
   - `1` - Start a test (choose from tests 1-25)
   - `2` - View your test results
   - `3` - Get help

### Taking a Test

1. Select test number (1-25)
2. Answer each question with A, B, C, or D
3. Bot automatically moves to next question
4. After 25 questions, view your results

### Test Results

Results show:
- ✅ **Score**: X/25
- 📊 **Percentage**: X%
- 🎯 **Status**: PASSED (≥75%) or FAILED (<75%)
- 📅 **Date**: When the test was completed

## Database

The bot uses **SQLite** for persistent storage:

### Tables
- `tests` - All 25 driving theory tests
- `users` - Registered users and their state
- `test_results` - Test attempts and answers

Database is auto-created on first run.

## Test Data

The application includes 25 comprehensive driving theory tests covering:
- Test 1: General Road Rules
- Test 2: Vehicle Maintenance
- Test 3: Defensive Driving
- Tests 4-25: Various driving topics (Road Signs, Traffic Signals, Parking, Pedestrian Safety, etc.)

Each test has 25 questions with 4 multiple choice options.

## Configuration

Edit `src/config/config.js` to customize:
- Database path
- Number of questions per test
- Passing percentage (default: 75%)
- WhatsApp session path

## Development

### Install dev dependencies
```bash
npm install --save-dev nodemon
```

### Run in development mode (with auto-reload)
```bash
npm run dev
```

## Technologies Used

- **whatsapp-web.js** - WhatsApp Web automation
- **SQLite3** - Lightweight database
- **dotenv** - Environment variables
- **axios** - HTTP requests (for media handling)

## Design Patterns

1. **Hexagonal Architecture** - Core domain isolated from external concerns
2. **Repository Pattern** - Abstract data access
3. **Use Case Pattern** - Encapsulate business logic
4. **Adapter Pattern** - Implement ports for different technologies
5. **Dependency Injection** - ApplicationContainer manages dependencies

## API Reference

### BotCommandHandler
Main entry point for message handling

### Use Cases
- `StartTestUseCase` - Initiate a test
- `SubmitAnswerUseCase` - Record answer
- `CompleteTestUseCase` - Finish and score test
- `GetAllTestsUseCase` - List all tests
- `GetTestQuestionUseCase` - Fetch a specific question
- `GetUserResultsUseCase` - Retrieve user history

### Repositories
- `TestRepository` - Test CRUD operations
- `UserRepository` - User CRUD operations
- `TestResultRepository` - Result CRUD operations

## Future Enhancements

- [ ] Image support for questions
- [ ] Timed tests with countdown
- [ ] Leaderboards
- [ ] Question explanations
- [ ] Topic-wise analytics
- [ ] Practice mode vs. test mode
- [ ] Admin dashboard
- [ ] Multiple language support

## Troubleshooting

### QR Code not appearing
- Ensure headless mode is working
- Check Node.js version compatibility
- Verify WhatsApp version is updated

### Database errors
- Delete `./data/driving_school.db` and restart
- Ensure `/data` directory exists and is writable

### WhatsApp disconnections
- Bot will auto-reconnect
- Check internet connection
- Ensure WhatsApp is not logged in elsewhere

## License

MIT License - Feel free to use and modify

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review domain/usecases for business logic
3. Check adapters for integration issues

---

**Made for Zimbabwe Driving School** 🚗
