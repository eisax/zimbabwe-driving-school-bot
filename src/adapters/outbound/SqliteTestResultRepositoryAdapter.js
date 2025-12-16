/**
 * SQLite Test Result Repository Adapter
 * Implements TestResultRepositoryPort using SQLite
 */
const TestResultRepositoryPort = require('../../ports/TestResultRepositoryPort');

class SqliteTestResultRepositoryAdapter extends TestResultRepositoryPort {
  constructor(dbPath = './data/driving_school.db') {
    super();
    this.dbPath = dbPath;
    this.db = null;
    this.results = new Map(); // In-memory cache
  }

  async initialize(db) {
    this.db = db;
    return this.createTableIfNotExists();
  }

  async createTableIfNotExists() {
    return new Promise((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS test_results (
          result_id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          test_id TEXT NOT NULL,
          user_name TEXT,
          answers TEXT,
          score INTEGER DEFAULT 0,
          total_questions INTEGER DEFAULT 0,
          started_at DATETIME,
          completed_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(user_id),
          FOREIGN KEY (test_id) REFERENCES tests(test_id)
        )`,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async getResultById(resultId) {
    if (this.results.has(resultId)) {
      return this.results.get(resultId);
    }

    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM test_results WHERE result_id = ?',
        [resultId],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            const TestResult = require('../../domain/entities/TestResult');
            const result = new TestResult(row.user_id, row.test_id, row.user_name);
            result.resultId = row.result_id;
            result.answers = JSON.parse(row.answers || '{}');
            result.score = row.score;
            result.totalQuestions = row.total_questions;
            result.startedAt = new Date(row.started_at);
            result.completedAt = row.completed_at ? new Date(row.completed_at) : null;
            this.results.set(resultId, result);
            resolve(result);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  async getResultsByUserId(userId) {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM test_results WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const TestResult = require('../../domain/entities/TestResult');
            const results = rows.map((row) => {
              const result = new TestResult(row.user_id, row.test_id, row.user_name);
              result.resultId = row.result_id;
              result.answers = JSON.parse(row.answers || '{}');
              result.score = row.score;
              result.totalQuestions = row.total_questions;
              result.startedAt = new Date(row.started_at);
              result.completedAt = row.completed_at ? new Date(row.completed_at) : null;
              return result;
            });
            resolve(results);
          }
        }
      );
    });
  }

  async getResultsByTestId(testId) {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM test_results WHERE test_id = ? ORDER BY created_at DESC',
        [testId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const TestResult = require('../../domain/entities/TestResult');
            const results = rows.map((row) => {
              const result = new TestResult(row.user_id, row.test_id, row.user_name);
              result.resultId = row.result_id;
              result.answers = JSON.parse(row.answers || '{}');
              result.score = row.score;
              result.totalQuestions = row.total_questions;
              result.startedAt = new Date(row.started_at);
              result.completedAt = row.completed_at ? new Date(row.completed_at) : null;
              return result;
            });
            resolve(results);
          }
        }
      );
    });
  }

  async save(result) {
    return new Promise((resolve, reject) => {
      const answers = JSON.stringify(result.answers);
      this.db.run(
        `INSERT OR REPLACE INTO test_results 
         (result_id, user_id, test_id, user_name, answers, score, total_questions, started_at, completed_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          result.resultId,
          result.userId,
          result.testId,
          result.userName,
          answers,
          result.score,
          result.totalQuestions,
          result.startedAt,
          result.completedAt,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            this.results.set(result.resultId, result);
            resolve();
          }
        }
      );
    });
  }

  async delete(resultId) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'DELETE FROM test_results WHERE result_id = ?',
        [resultId],
        (err) => {
          if (err) {
            reject(err);
          } else {
            this.results.delete(resultId);
            resolve();
          }
        }
      );
    });
  }
}

module.exports = SqliteTestResultRepositoryAdapter;
