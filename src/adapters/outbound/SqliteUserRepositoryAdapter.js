/**
 * SQLite User Repository Adapter
 * Implements UserRepositoryPort using SQLite
 */
const UserRepositoryPort = require('../../ports/UserRepositoryPort');
const sqlite3 = require('sqlite3').verbose();

class SqliteUserRepositoryAdapter extends UserRepositoryPort {
  constructor(dbPath = './data/driving_school.db') {
    super();
    this.dbPath = dbPath;
    this.db = null;
    this.users = new Map(); // In-memory cache
  }

  async initialize(db) {
    this.db = db;
    return this.createTableIfNotExists();
  }

  async createTableIfNotExists() {
    return new Promise((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS users (
          user_id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          phone_number TEXT UNIQUE,
          test_history TEXT,
          current_test TEXT,
          current_question_index INTEGER DEFAULT 0,
          state TEXT DEFAULT 'MENU',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async getUserById(userId) {
    if (this.users.has(userId)) {
      return this.users.get(userId);
    }

    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM users WHERE user_id = ?',
        [userId],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            const User = require('../../domain/entities/User');
            const user = new User(row.user_id, row.name, row.phone_number);
            user.testHistory = JSON.parse(row.test_history || '[]');
            user.currentTest = row.current_test;
            user.currentQuestionIndex = row.current_question_index;
            user.state = row.state;
            this.users.set(userId, user);
            resolve(user);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  async getUserByPhoneNumber(phoneNumber) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM users WHERE phone_number = ?',
        [phoneNumber],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            const User = require('../../domain/entities/User');
            const user = new User(row.user_id, row.name, row.phone_number);
            user.testHistory = JSON.parse(row.test_history || '[]');
            user.currentTest = row.current_test;
            user.currentQuestionIndex = row.current_question_index;
            user.state = row.state;
            resolve(user);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  async getAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const User = require('../../domain/entities/User');
          const users = rows.map((row) => {
            const user = new User(row.user_id, row.name, row.phone_number);
            user.testHistory = JSON.parse(row.test_history || '[]');
            user.currentTest = row.current_test;
            user.currentQuestionIndex = row.current_question_index;
            user.state = row.state;
            return user;
          });
          resolve(users);
        }
      });
    });
  }

  async save(user) {
    return new Promise((resolve, reject) => {
      const testHistory = JSON.stringify(user.testHistory);
      this.db.run(
        `INSERT OR REPLACE INTO users 
         (user_id, name, phone_number, test_history, current_test, current_question_index, state, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [
          user.userId,
          user.name,
          user.phoneNumber,
          testHistory,
          user.currentTest,
          user.currentQuestionIndex,
          user.state,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            this.users.set(user.userId, user);
            resolve();
          }
        }
      );
    });
  }

  async delete(userId) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'DELETE FROM users WHERE user_id = ?',
        [userId],
        (err) => {
          if (err) {
            reject(err);
          } else {
            this.users.delete(userId);
            resolve();
          }
        }
      );
    });
  }
}

module.exports = SqliteUserRepositoryAdapter;
