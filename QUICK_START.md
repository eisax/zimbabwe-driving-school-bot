# Quick Start Guide

## 30 Seconds Setup

```bash
# 1. Navigate to project
cd /Users/josphatndhlovu/Documents/WORK/vid

# 2. Install dependencies
npm install

# 3. Run the bot
npm start
```

## What to Do Next

1. **Scan QR Code** with WhatsApp (WhatsApp → Settings → Linked Devices → Link Device)
2. **Send a message** to the bot to start
3. **Type "1"** to start a test
4. **Type a test number** (1-25)
5. **Answer questions** with A, B, C, or D

## Project Files Overview

```
/src
├── domain/           ← Core business logic (entities + use cases)
├── ports/            ← Interface definitions
├── adapters/
│   ├── inbound/      ← WhatsApp integration
│   └── outbound/     ← Database (SQLite)
└── config/           ← App configuration & dependency injection

index.js             ← Application entry point
README.md            ← Full documentation
ARCHITECTURE.md      ← Architecture details
USAGE_GUIDE.md       ← How to use the bot
```

## Key Features

[] 25 different driving theory tests  
[] 25 questions per test  
[] Automatic test scoring (pass at 75%)  
[] Test history & results tracking  
[] Hexagonal architecture for clean code  

## Architecture Highlights

- **Domain Layer** - Pure business logic (independent of frameworks)
- **Ports** - Interface definitions (contracts)
- **Adapters** - Implementations (WhatsApp, SQLite)
- **Dependency Injection** - Loose coupling, easy to test & extend

## Database

Automatically created on first run:
- `./data/driving_school.db` - SQLite database
- Tables: tests, users, test_results

## Development Mode

```bash
# Auto-reloads on file changes
npm run dev
```

Requires `nodemon`:
```bash
npm install --save-dev nodemon
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| QR code not showing | Ensure WhatsApp is up to date |
| Bot not responding | Check internet, send message again |
| Database errors | Delete `./data/driving_school.db`, restart |
| Module not found | Run `npm install` |

## Architecture Benefits

🏗️ **Testable** - Mock dependencies easily  
🔌 **Extensible** - Swap implementations (e.g., PostgreSQL instead of SQLite)  
📚 **Maintainable** - Clear separation of concerns  
🚀 **Scalable** - Ready for microservices  

## What to Read Next

1. **README.md** - Full feature documentation
2. **USAGE_GUIDE.md** - How users interact with the bot
3. **ARCHITECTURE.md** - Deep dive into design patterns

## Common Tasks

### Add a new test
Edit `data/testData.js` - add questions to the `createTestData()` function

### Change passing percentage
Edit `src/config/config.js` - modify `tests.passingPercentage`

### Add new use case
1. Create `src/domain/usecases/MyNewUseCase.js`
2. Inject repositories in constructor
3. Implement `execute()` method
4. Use in `BotCommandHandler.js`

### Switch to different database
1. Create adapter implementing `TestRepositoryPort`, `UserRepositoryPort`, etc.
2. Update `src/config/ApplicationContainer.js` to use new adapter
3. No domain logic changes needed!

## Performance

- Tests cached in memory for fast access
- SQLite for lightweight local storage
- Efficient message handling
- Minimal dependencies

## Next Steps

1. [] Run `npm start` and authenticate
2. [] Test with a few messages
3. [] Read USAGE_GUIDE.md for full features
4. [] Read ARCHITECTURE.md for design details
5. [] Customize test data in `data/testData.js`

---

**You now have a production-ready WhatsApp driving school bot!**
