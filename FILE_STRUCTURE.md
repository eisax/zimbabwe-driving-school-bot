# File Structure and Descriptions

## Project Root Files

### `index.js`
**Entry point of the application**
- Initializes WhatsApp client
- Sets up event listeners (qr, ready, message, disconnected, error)
- Creates ApplicationContainer for dependency injection
- Loads test data on startup
- Handles graceful shutdown
- ~120 lines

### `package.json`
**Node.js project configuration**
- Dependencies: whatsapp-web.js, sqlite3, dotenv, axios, express, cors, qrcode-terminal
- Scripts: `npm start`, `npm run dev`

### `.env`
**Environment variables (local configuration)**
- NODE_ENV, DB_PATH, LOG_LEVEL, WHATSAPP_SESSION_PATH

### `.gitignore`
**Git ignore rules**

---

## Documentation Files

| File | Purpose | Size |
|------|---------|------|
| `README.md` | Full project documentation | ~280 lines |
| `QUICK_START.md` | 3-step getting started guide | ~150 lines |
| `USAGE_GUIDE.md` | How to use the bot | ~160 lines |
| `ARCHITECTURE.md` | Architecture deep dive | ~200 lines |
| `PROJECT_SUMMARY.md` | Project completion summary | ~400 lines |
| `DIAGRAMS.md` | Visual diagrams | ~300 lines |
| `FILE_STRUCTURE.md` | This file | ~300 lines |

---

## Source Code Structure (`/src`)

### Domain Layer (`/src/domain`)

#### Entities (`/src/domain/entities`)
- **Test.js** - Test with 25 questions (~45 lines)
- **Question.js** - Multiple choice question (~52 lines)
- **User.js** - User profile and state (~63 lines)
- **TestResult.js** - Test attempt and score (~79 lines)

#### Use Cases (`/src/domain/usecases`)
- **StartTestUseCase.js** - Initialize test (~48 lines)
- **SubmitAnswerUseCase.js** - Record answer (~39 lines)
- **CompleteTestUseCase.js** - Score test (~50 lines)
- **GetAllTestsUseCase.js** - List tests (~24 lines)
- **GetTestQuestionUseCase.js** - Get question (~31 lines)
- **GetUserResultsUseCase.js** - Get history (~24 lines)

### Ports (`/src/ports`)
Interface definitions - implement these to add new adapters
- **TestRepositoryPort.js** - Test data access
- **UserRepositoryPort.js** - User data access
- **TestResultRepositoryPort.js** - Result data access
- **WhatsAppMessagePort.js** - Message sending
- **NotificationPort.js** - Notifications

### Adapters (`/src/adapters`)

#### Inbound Adapters (`/src/adapters/inbound`)
- **WhatsAppWebAdapter.js** - WhatsApp client integration (~92 lines)
- **WhatsAppNotificationAdapter.js** - Message formatting (~107 lines)
- **BotCommandHandler.js** - Message routing (~251 lines)

#### Outbound Adapters (`/src/adapters/outbound`)
- **SqliteTestRepositoryAdapter.js** - SQLite test storage (~116 lines)
- **SqliteUserRepositoryAdapter.js** - SQLite user storage (~130 lines)
- **SqliteTestResultRepositoryAdapter.js** - SQLite result storage (~129 lines)

### Configuration (`/src/config`)
- **config.js** - Settings (~28 lines)
- **ApplicationContainer.js** - Dependency injection (~89 lines)

---

## Data Directory (`/data`)

### `testData.js`
**Test questions database** (~800 lines)
- 25 tests with 25 questions each
- Tests 1-3: Detailed Zimbabwe driving questions
- Tests 4-25: Topic-specific questions

### `driving_school.db`
**SQLite database** (auto-created)
- Tables: tests, users, test_results
- Auto-populated on first run

### `whatsapp-session/`
**WhatsApp authentication** (auto-created)
- Session data and tokens
- NOT committed to git

---

## How to Use

### Quick Start
```bash
npm install
npm start
# Scan QR code with WhatsApp
```

### Project Structure
```
zimbabwe-driving-school-bot/
├── src/
│   ├── domain/
│   │   ├── entities/          (Test, Question, User, TestResult)
│   │   └── usecases/          (6 use cases)
│   ├── ports/                 (5 interfaces)
│   ├── adapters/
│   │   ├── inbound/           (WhatsApp, Notifications, Handler)
│   │   └── outbound/          (SQLite repositories)
│   └── config/                (Configuration, DI)
├── data/
│   ├── testData.js            (25 tests)
│   ├── driving_school.db      (auto-created)
│   └── whatsapp-session/      (auto-created)
├── index.js                   (Entry point)
├── package.json
├── .env
├── .gitignore
├── README.md
├── QUICK_START.md
├── USAGE_GUIDE.md
├── ARCHITECTURE.md
├── PROJECT_SUMMARY.md
├── DIAGRAMS.md
└── FILE_STRUCTURE.md          (this file)
```

---

## Code Statistics

| Component | Files | Lines | Purpose |
|-----------|-------|-------|---------|
| Domain Entities | 4 | 240 | Core business models |
| Domain Use Cases | 6 | 215 | Business logic |
| Ports | 5 | 125 | Interface definitions |
| Inbound Adapters | 3 | 450 | Input adapters |
| Outbound Adapters | 3 | 375 | Output adapters |
| Configuration | 2 | 117 | Setup & DI |
| Test Data | 1 | 800 | Questions |
| Documentation | 7 | 1,800 | Guides & docs |
| **Total** | **31** | **4,122** | |

---

## Key Files to Modify

To customize the bot:

| Customization | File | Section |
|---|---|---|
| Change test questions | `data/testData.js` | `createTestData()` |
| Change passing score | `src/config/config.js` | `passingPercentage` |
| Change messages | `src/adapters/inbound/WhatsAppNotificationAdapter.js` | `send*Notification()` |
| Add new command | `src/adapters/inbound/BotCommandHandler.js` | `handleMenuInput()` |
| Change database | Create new adapter | Implement `TestRepositoryPort` |

---

## Architecture Highlights

### Hexagonal Architecture Benefits
[] Domain logic isolated from frameworks  
[] Easy to test - mock any adapter  
[] Easy to swap implementations  
[] Clean code principles  
[] High maintainability  

### Design Patterns Used
- **Hexagonal Architecture** - Separation of concerns
- **Repository Pattern** - Data abstraction
- **Use Case Pattern** - Business logic organization
- **Adapter Pattern** - Interface implementations
- **Dependency Injection** - Loose coupling

---

## Database Schema

### Tests Table
```sql
test_id (PK)  | title | description | questions (JSON) | timestamps
```

### Users Table
```sql
user_id (PK) | name | phone | test_history (JSON) | current_test | 
current_question_index | state | timestamps
```

### Test Results Table
```sql
result_id (PK) | user_id (FK) | test_id (FK) | user_name | 
answers (JSON) | score | total_questions | timestamps
```

---

## Next Steps

1. [] Run `npm install`
2. [] Run `npm start`
3. [] Scan QR code
4. [] Start testing!

For details, see:
- **QUICK_START.md** - Get up and running
- **USAGE_GUIDE.md** - How to use
- **ARCHITECTURE.md** - How it works
- **DIAGRAMS.md** - Visual diagrams

---

**Project Status: [] COMPLETE AND READY TO RUN**
