# Zimbabwe Driving School WhatsApp Bot - Architecture Documentation

## Overview

A production-ready WhatsApp bot for administering driving theory tests, built using **Hexagonal Architecture** (Ports and Adapters pattern) for clean code and maintainability.

## Quick Start

```bash
# Install dependencies
npm install

# Run the bot
npm start

# Development mode (with auto-reload)
npm run dev
```

Scan the QR code with WhatsApp and start using!

## Architecture Deep Dive

### Hexagonal Architecture Benefits

This application implements hexagonal architecture which provides:

```
┌─────────────────────────────────────────────────────────────┐
│                     External World                           │
│          (WhatsApp, Database, File System)                   │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                  ADAPTERS (Implementations)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Inbound: WhatsAppWebAdapter, BotCommandHandler       │   │
│  │ Outbound: SqliteTestRepository, SqliteUserRepository│   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                    PORTS (Interfaces)                        │
│  TestRepositoryPort, UserRepositoryPort, etc.               │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                    DOMAIN (Core Logic)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Entities: Test, Question, User, TestResult          │   │
│  │ Use Cases: StartTestUseCase, SubmitAnswerUseCase    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Layer Descriptions

#### 1. Domain Layer (Core Business Logic)
- **Completely independent** of frameworks and external systems
- Contains **pure business logic**
- No dependencies on external libraries

**Entities:**
```javascript
// Test Entity - represents a driving theory test
- testId: string
- title: string
- questions: Question[]
- methods: addQuestion(), getQuestion(), getTotalQuestions()

// Question Entity - individual question with options
- questionId: string
- questionText: string
- options: string[] (A, B, C, D)
- correctAnswer: string
- imageUrl: string (optional)
- methods: isAnswerCorrect(), hasImage()

// User Entity - represents a user
- userId: string
- name: string
- testHistory: string[]
- currentTest: string
- state: 'MENU' | 'SELECTING_TEST' | 'TAKING_TEST'
- methods: startTest(), nextQuestion(), completeTest()

// TestResult Entity - records test attempt
- resultId: string
- userId: string
- testId: string
- answers: Map<questionId, answer>
- score: number
- methods: recordAnswer(), calculateScore()
```

**Use Cases:**
```javascript
// StartTestUseCase
execute(userId, userName, testId)
→ Creates TestResult, starts test for user

// SubmitAnswerUseCase
execute(userId, resultId, questionId, userAnswer)
→ Records answer, advances to next question

// CompleteTestUseCase
execute(userId, resultId)
→ Calculates final score, updates user state

// GetTestQuestionUseCase
execute(testId, questionIndex)
→ Retrieves specific question

// GetAllTestsUseCase
execute()
→ Returns list of all available tests

// GetUserResultsUseCase
execute(userId)
→ Returns test history for a user
```

#### 2. Ports (Interface Definitions)

Ports define **contracts** that adapters must implement:

```javascript
// TestRepositoryPort
- getTestById(testId)
- getAllTests()
- save(test)
- delete(testId)

// UserRepositoryPort
- getUserById(userId)
- getUserByPhoneNumber(phoneNumber)
- getAllUsers()
- save(user)
- delete(userId)

// TestResultRepositoryPort
- getResultById(resultId)
- getResultsByUserId(userId)
- getResultsByTestId(testId)
- save(result)
- delete(resultId)

// WhatsAppMessagePort
- sendMessage(chatId, message)
- sendMediaMessage(chatId, mediaUrl, caption)
- sendButtonMessage(chatId, text, buttons)
- sendListMessage(chatId, title, items)

// NotificationPort
- sendTestNotification(chatId, testId, testTitle)
- sendResultNotification(chatId, result)
- sendQuestionNotification(chatId, question, number, total)
```

#### 3. Adapters (Implementations)

Adapters implement ports and connect domain to external systems:

**Inbound Adapters (Input):**
- `WhatsAppWebAdapter` - Sends messages via WhatsApp
- `BotCommandHandler` - Processes user messages and routes to use cases
- `WhatsAppNotificationAdapter` - Sends formatted notifications

**Outbound Adapters (Output):**
- `SqliteTestRepositoryAdapter` - Persists tests to SQLite
- `SqliteUserRepositoryAdapter` - Manages user data
- `SqliteTestResultRepositoryAdapter` - Stores test results

#### 4. Configuration & Dependency Injection

**ApplicationContainer** manages all dependencies:
```javascript
// Initializes all repositories
await container.initialize(dbPath)

// Provides access to repositories
container.getTestRepository()
container.getUserRepository()
container.getResultRepository()
```

## Data Flow

### Test Taking Flow

```
User sends message
    ↓
BotCommandHandler.handleMessage()
    ↓
Check user state (MENU, TAKING_TEST, SELECTING_TEST)
    ↓
Route to appropriate handler
    ↓
Execute use case (e.g., StartTestUseCase)
    ↓
Use case uses repository ports to access data
    ↓
Adapters implement ports and interact with SQLite
    ↓
Return result to command handler
    ↓
Send response via WhatsAppNotificationAdapter
```

### Example: Starting a Test

```javascript
// User inputs: "1" (start test)
// -> handleMenuInput() detects this
// -> Sets user state to SELECTING_TEST
// -> Calls showTestList()

// User inputs: "5" (select test 5)
// -> handleTestSelection() called
// -> Calls StartTestUseCase.execute(userId, userName, testId)
//    - Repository gets Test from database
//    - Creates new TestResult
//    - Updates user state to TAKING_TEST
// -> Sends question via WhatsAppNotificationAdapter
```

## Database Schema

### Tests Table
```sql
CREATE TABLE tests (
  test_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  questions TEXT,  -- JSON array of questions
  created_at DATETIME,
  updated_at DATETIME
)
```

### Users Table
```sql
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number TEXT UNIQUE,
  test_history TEXT,  -- JSON array of test IDs
  current_test TEXT,
  current_question_index INTEGER,
  state TEXT,
  created_at DATETIME,
  updated_at DATETIME
)
```

### Test Results Table
```sql
CREATE TABLE test_results (
  result_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  test_id TEXT NOT NULL,
  user_name TEXT,
  answers TEXT,  -- JSON object of answers
  score INTEGER,
  total_questions INTEGER,
  started_at DATETIME,
  completed_at DATETIME,
  created_at DATETIME
)
```

## Testing with the Architecture

The hexagonal architecture makes testing easy:

```javascript
// Mock repositories for testing use cases
class MockTestRepository extends TestRepositoryPort {
  async getTestById(testId) {
    return new Test(testId, "Test", [/* questions */]);
  }
}

// Test use case without external dependencies
const startTestUseCase = new StartTestUseCase(
  new MockTestRepository(),
  new MockUserRepository(),
  new MockResultRepository()
);

const result = await startTestUseCase.execute(userId, userName, testId);
```

## Extending the Application

### Adding a New Repository

1. Create port in `src/ports/NewRepositoryPort.js`
2. Create adapter in `src/adapters/outbound/SqliteNewRepositoryAdapter.js`
3. Update `ApplicationContainer` to initialize it
4. Use in use cases

### Adding a New Use Case

1. Create file in `src/domain/usecases/NewUseCase.js`
2. Inject required repositories in constructor
3. Implement execute method with business logic
4. Use in `BotCommandHandler`

### Changing Database

1. Create new adapter implementing repository ports
2. Replace SQLite adapters in `ApplicationContainer`
3. No domain logic changes needed!

### Adding New External Service

1. Create port in `src/ports/`
2. Create adapter implementing the port
3. Update `ApplicationContainer` to use it
4. Inject into adapters that need it

## Best Practices Used

1. **Single Responsibility** - Each class has one reason to change
2. **Open/Closed** - Open for extension, closed for modification
3. **Liskov Substitution** - Adapters are substitutable
4. **Interface Segregation** - Focused, specific ports
5. **Dependency Inversion** - Depend on abstractions (ports), not concrete classes

## Performance Considerations

- **In-memory caching** in repositories (tests, users)
- **SQLite** for lightweight persistence
- **Efficient message handling** - one handler per message
- **Lazy loading** - Data loaded only when needed

## Security Considerations

- No sensitive data logged
- WhatsApp handles user authentication
- SQLite database is local
- No external API calls (extensible)

## Monitoring & Debugging

Enable logs by setting `LOG_LEVEL=debug` in `.env`

```javascript
// Logging points in application flow:
- User message received
- Use case execution
- Database operations
- Message sent
- Errors caught and logged
```

## File Size & Complexity

```
Domain: ~2KB (pure logic, highly focused)
Ports: ~1KB (interfaces only)
Adapters: ~15KB (implementations)
Config: ~2KB
Total: ~20KB production code
```

All code is clean, readable, and maintainable.

## Future Architecture Enhancements

1. **Event Sourcing** - Track all user actions as events
2. **CQRS** - Separate read/write paths
3. **Microservices** - Split into multiple services
4. **Cache Layer** - Redis for performance
5. **Message Queue** - Handle high load
6. **Admin Dashboard** - Separate API for analytics

## Glossary

- **Port** - Interface defining a contract
- **Adapter** - Implementation of a port
- **Use Case** - Business logic execution
- **Entity** - Core business object
- **Repository** - Data access abstraction
- **DI** - Dependency Injection
- **Hexagonal Architecture** - Also called "Ports and Adapters"

---

This architecture ensures the application is maintainable, testable, and ready to scale!
