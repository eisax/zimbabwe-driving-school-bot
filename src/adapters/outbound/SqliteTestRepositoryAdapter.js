/**
 * SQLite Test Repository Adapter
 * Implements TestRepositoryPort using SQLite
 */
const TestRepositoryPort = require('../../ports/TestRepositoryPort');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

class SqliteTestRepositoryAdapter extends TestRepositoryPort {
  constructor(dbPath = './data/driving_school.db') {
    super();
    this.dbPath = dbPath;
    this.db = null;
    this.tests = new Map(); // In-memory cache for tests
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          this.createTableIfNotExists().then(resolve).catch(reject);
        }
      });
    });
  }

  async createTableIfNotExists() {
    return new Promise((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS tests (
          test_id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          questions TEXT,
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

  async getTestById(testId) {
    // Check cache first
    if (this.tests.has(testId)) {
      return this.tests.get(testId);
    }

    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM tests WHERE test_id = ?',
        [testId],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            const Test = require('../../domain/entities/Test');
            const test = new Test(
              row.test_id,
              row.title,
              row.description,
              JSON.parse(row.questions || '[]')
            );
            this.tests.set(testId, test);
            resolve(test);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  async getAllTests() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM tests ORDER BY test_id', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const Test = require('../../domain/entities/Test');
          const tests = rows.map(
            (row) =>
              new Test(
                row.test_id,
                row.title,
                row.description,
                JSON.parse(row.questions || '[]')
              )
          );
          tests.forEach((test) => this.tests.set(test.testId, test));
          resolve(tests);
        }
      });
    });
  }

  async save(test) {
    return new Promise((resolve, reject) => {
      const questions = JSON.stringify(test.questions);
      this.db.run(
        `INSERT OR REPLACE INTO tests (test_id, title, description, questions, updated_at)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [test.testId, test.title, test.description, questions],
        (err) => {
          if (err) {
            reject(err);
          } else {
            this.tests.set(test.testId, test);
            resolve();
          }
        }
      );
    });
  }

  async delete(testId) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'DELETE FROM tests WHERE test_id = ?',
        [testId],
        (err) => {
          if (err) {
            reject(err);
          } else {
            this.tests.delete(testId);
            resolve();
          }
        }
      );
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

module.exports = SqliteTestRepositoryAdapter;
