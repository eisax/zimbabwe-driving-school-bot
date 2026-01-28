# Usage Guide - Zimbabwe Driving School WhatsApp Bot

## Getting Started

### Initial Setup

1. **Start the bot:**
   ```bash
   npm start
   ```

2. **Authenticate:**
   - Bot will display a QR code in terminal
   - Open WhatsApp on your phone
   - Go to Settings → Linked Devices → Link a Device
   - Scan the QR code

3. **Bot is ready when you see:**
   ```
   [] WhatsApp bot is ready!
   Bot is logged in and ready to receive messages
   ```

## Using the Bot

### Main Menu

Send any message to bot to see the menu:

```
Zimbabwe Driving School Bot

Welcome! Choose an option:

1️⃣ - Start a test
2️⃣ - View my results  
3️⃣ - Help

Type the number to continue.
```

### Option 1: Start a Test

1. **Reply with:** `1`
2. **Bot responds with list of tests (1-25):**
   ```
   📋 Available Tests

   1. Test 1: General Road Rules
   2. Test 2: Vehicle Maintenance
   3. Test 3: Defensive Driving
   ... (up to Test 25)

   Type the test number to start.
   ```

3. **Select a test** - Reply with test number (e.g., `5`)

4. **Test starts:**
   ```
   [] Test Started: Test 5: Motorcycle Rules

   Test ID: 5
   Total Questions: 25

   To answer, simply type the letter (A, B, C, or D)
   Example: A

   Let's begin! 🚗
   ```

5. **Answer questions:**
   ```
   Question 1/25

   What is the legal age to ride a motorcycle in Zimbabwe?

   A. 16 years
   B. 18 years
   C. 21 years
   D. 25 years

   Reply with: A, B, C, or D
   ```

   **Simply reply:** `B`

6. **Automatic progression:**
   After each answer, bot automatically shows next question

7. **Complete test:**
   After answering all 25 questions, results appear:
   ```
   TEST RESULTS

   [] PASSED

   Score: 20/25
   Percentage: 80%

   Test ID: 5
   Date: 12/16/2025

   Great job! 🎉
   ```

### Option 2: View Results

**Reply with:** `2`

**Bot shows all your test history:**
```
📊 Your Test Results

1. Test 5
   Score: 20/25
   Percentage: 80%
   Status: [] Passed
   Date: 12/16/2025

2. Test 1
   Score: 19/25
   Percentage: 76%
   Status: [] Passed
   Date: 12/15/2025

3. Test 3
   Score: 15/25
   Percentage: 60%
   Status: ❌ Failed
   Date: 12/14/2025
```

### Option 3: Help

**Reply with:** `3` or `help`

**Bot displays help information:**
```
📚 How to Use the Bot

1. Start a Test: Choose from tests 1-25, each with 25 questions
2. Answer Questions: Type the letter (A, B, C, or D)
3. View Results: See your score and percentage
4. Track Progress: View all your test history

Tips:
- Read questions carefully
- Some questions have images
- You need 75% to pass
- Take your time!

For more help, type "help"
```

## Test Topics (Tests 1-25)

| Test | Topic |
|------|-------|
| 1 | General Road Rules |
| 2 | Vehicle Maintenance |
| 3 | Defensive Driving |
| 4 | Road Signs and Markings |
| 5 | Traffic Signals |
| 6 | Parking Regulations |
| 7 | Pedestrian Safety |
| 8 | Motorcycle Rules |
| 9 | Truck Regulations |
| 10 | Night Driving |
| 11 | Adverse Weather |
| 12 | Emergency Procedures |
| 13 | Vehicle Inspections |
| 14 | Licensing Requirements |
| 15 | Insurance Basics |
| 16 | Loading and Securing Cargo |
| 17 | Eco-Friendly Driving |
| 18 | Speed Management |
| 19 | Lane Discipline |
| 20 | At-Risk Drivers |
| 21 | Accident Procedures |
| 22 | Hazard Recognition |
| 23 | Safe Zone Driving |
| 24 | Mountain Driving |
| 25 | Off-Road Driving |

## Scoring & Passing

- **Total Questions per Test:** 25
- **Passing Score:** 75% (19/25 questions)
- **Pass Status:** [] (20-25 correct)
- **Fail Status:** ❌ (0-18 correct)

## Example Test Session

```
User: [Any message to start]

Bot: 🚗 Zimbabwe Driving School Bot 🚗
     Welcome! Choose an option:
     1️⃣ - Start a test
     2️⃣ - View my results
     3️⃣ - Help
     Type the number to continue.

User: 1

Bot: 📋 Available Tests
     1. Test 1: General Road Rules
     2. Test 2: Vehicle Maintenance
     ...
     Type the test number to start.

User: 1

Bot: [] Test Started: Test 1: General Road Rules
     Test ID: 1
     Total Questions: 25
     To answer, simply type the letter (A, B, C, or D)
     Example: A
     Let's begin! 🚗

Bot: Question 1/25
     What is the speed limit in residential areas in Zimbabwe?
     A. 40 km/h
     B. 50 km/h
     C. 60 km/h
     D. 80 km/h
     Reply with: A, B, C, or D

User: A

Bot: Question 2/25
     When should you use your hazard lights?
     ...

[User continues answering 23 more questions]

Bot: TEST RESULTS
     [] PASSED
     Score: 20/25
     Percentage: 80%
     Test ID: 1
     Date: 12/16/2025
     Great job! 🎉

     What would you like to do next? (1, 2, or 3)
     🚗 Zimbabwe Driving School Bot 🚗
     ...

User: 2

Bot: 📊 Your Test Results
     1. Test 1
        Score: 20/25
        Percentage: 80%
        Status: [] Passed
        Date: 12/16/2025

     What would you like to do next? (1, 2, or 3)
```

## Tips for Success

### Before Taking a Test
- [] Choose a quiet environment
- [] Have enough time (about 30-40 minutes)
- [] Be well-rested
- [] Read questions carefully

### While Taking a Test
- [] Read the full question before answering
- [] Examine any images provided
- [] Take your time - there's no time limit
- [] Think about each option
- [] Answer based on Zimbabwe driving laws

### If You Fail
- ❌ Don't worry! You can retake anytime
- ❌ Review the topic covered
- ❌ Take the test again
- ❌ Try other related tests to learn more

## Troubleshooting

### "Invalid option. Please reply with 1, 2, or 3"
- This happens if you send text instead of 1, 2, or 3
- At the menu, only use numbers 1, 2, or 3

### "Please reply with A, B, C, or D only"
- During a test, only answer with A, B, C, or D
- Don't send extra text or other answers

### "Test session not found"
- This happens if you wait too long between questions
- Just reply with "1" to start a fresh test

### Bot not responding
- Check internet connection
- WhatsApp may have timed out - send another message
- Bot will reconnect automatically

### Can't scan QR code
- Ensure WhatsApp is updated to latest version
- Use Settings → Linked Devices → Link a Device
- Make sure camera has proper lighting

## Data Privacy

- Your answers are stored locally in the bot's database
- No data is sent to external servers
- Only test scores and history are recorded
- All data is private to your WhatsApp account

## Features & Limitations

### [] Features
- Take 25 different tests
- 25 questions per test
- View test history
- See pass/fail status
- View percentage scores
- Retake tests unlimited times
- Image support for questions
- No time limits per question

### ⏳ Coming Soon
- Timed tests with countdown
- Question explanations
- Topic-wise performance analytics
- Practice mode
- Leaderboards
- Admin dashboard

## Contact & Support

If you encounter any issues:
1. Try the troubleshooting section above
2. Check your internet connection
3. Restart the bot if not responding
4. Report issues to the admin

---

Happy studying! 📚🚗

**Pass your driving tests with this bot!** 🎉
