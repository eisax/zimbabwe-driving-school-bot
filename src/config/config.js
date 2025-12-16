/**
 * Environment Configuration
 */

module.exports = {
  // App Config
  app: {
    name: 'Zimbabwe Driving School Bot',
    version: '1.0.0',
    description: 'WhatsApp bot for driving theory tests',
    environment: process.env.NODE_ENV || 'development',
  },

  // Database Config
  database: {
    path: process.env.DB_PATH || './data/driving_school.db',
  },

  // WhatsApp Config
  whatsapp: {
    qrCodeTimeout: 60000,
    sessionPath: './data/whatsapp-session',
  },

  // Test Config
  tests: {
    totalTests: 25,
    questionsPerTest: 25,
    passingPercentage: 75,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
