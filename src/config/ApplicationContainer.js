/**
 * Application Container (Dependency Injection)
 * Sets up all dependencies and injects them into use cases and adapters
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class ApplicationContainer {
  async initialize(dbPath = './data/driving_school.db') {
    // Initialize database
    this.db = await this.initializeDatabase(dbPath);

    // Initialize Repository Adapters
    const SqliteTestRepositoryAdapter = require('../adapters/outbound/SqliteTestRepositoryAdapter');
    const SqliteUserRepositoryAdapter = require('../adapters/outbound/SqliteUserRepositoryAdapter');
    const SqliteTestResultRepositoryAdapter = require('../adapters/outbound/SqliteTestResultRepositoryAdapter');

    this.testRepository = new SqliteTestRepositoryAdapter(dbPath);
    await this.testRepository.initialize();

    this.userRepository = new SqliteUserRepositoryAdapter(dbPath);
    await this.userRepository.initialize(this.db);

    this.resultRepository = new SqliteTestResultRepositoryAdapter(dbPath);
    await this.resultRepository.initialize(this.db);
  }

  initializeDatabase(dbPath) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      });
    });
  }

  getTestRepository() {
    return this.testRepository;
  }

  getUserRepository() {
    return this.userRepository;
  }

  getResultRepository() {
    return this.resultRepository;
  }

  getDatabase() {
    return this.db;
  }

  async close() {
    if (this.testRepository) {
      await this.testRepository.close();
    }
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
  }
}

module.exports = ApplicationContainer;
