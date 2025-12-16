#!/usr/bin/env node

/**
 * Main Application Entry Point
 * Zimbabwe Driving School WhatsApp Bot
 */

require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

const config = require('./src/config/config');
const ApplicationContainer = require('./src/config/ApplicationContainer');
const { createTestData } = require('./data/testData');

// Adapters
const WhatsAppWebAdapter = require('./src/adapters/inbound/WhatsAppWebAdapter');
const WhatsAppNotificationAdapter = require('./src/adapters/inbound/WhatsAppNotificationAdapter');
const BotCommandHandler = require('./src/adapters/inbound/BotCommandHandler');

class DrivingSchoolBot {
  constructor() {
    this.client = null;
    this.container = null;
    this.commandHandler = null;
  }

  async initialize() {
    console.log(`🚗 Initializing ${config.app.name}...`);

    // Create necessary directories
    if (!fs.existsSync('./data')) {
      fs.mkdirSync('./data', { recursive: true });
    }

    // Initialize application container (DI)
    this.container = new ApplicationContainer();
    await this.container.initialize(config.database.path);
    console.log('✅ Database initialized');

    // Load test data
    await this.loadTestData();
    console.log('✅ Test data loaded');

    // Initialize WhatsApp client
    this.initializeWhatsAppClient();
    console.log('✅ WhatsApp client ready');
  }

  async loadTestData() {
    const testRepository = this.container.getTestRepository();
    const existingTests = await testRepository.getAllTests();

    if (existingTests.length === 0) {
      console.log('📚 Loading test data...');
      const tests = createTestData();

      for (const test of tests) {
        await testRepository.save(test);
      }
      console.log(`✅ Loaded ${tests.length} tests`);
    } else {
      console.log(`✅ Tests already loaded (${existingTests.length} tests found)`);
    }
  }

  initializeWhatsAppClient() {
    this.client = new Client({
      authStrategy: new LocalAuth({
        dataPath: config.whatsapp.sessionPath,
      }),
      headless: true,
      puppeteer: {
        args: ['--no-sandbox'],
      },
    });

    // QR Code for authentication
    this.client.on('qr', (qr) => {
      console.log('\n📱 Scan this QR code with WhatsApp:');
      qrcode.generate(qr, { small: true });
      console.log('\n⏳ Waiting for authentication...\n');
    });

    // Ready event
    this.client.on('ready', () => {
      console.log('✅ WhatsApp bot is ready!');
      console.log('👤 Bot is logged in and ready to receive messages');
    });

    // Handle incoming messages
    this.client.on('message', async (message) => {
      if (message.from === 'status@broadcast') {
        return; // Ignore status broadcasts
      }

      console.log(`\n📨 Message from ${message.from}: ${message.body}`);

      try {
        // Initialize adapters with client
        const whatsappAdapter = new WhatsAppWebAdapter(this.client);
        const notificationAdapter = new WhatsAppNotificationAdapter(whatsappAdapter);

        // Initialize command handler
        this.commandHandler = new BotCommandHandler(
          this.container.getTestRepository(),
          this.container.getUserRepository(),
          this.container.getResultRepository(),
          whatsappAdapter,
          notificationAdapter
        );

        // Handle the message
        await this.commandHandler.handleMessage(message);
      } catch (error) {
        console.error('Error processing message:', error);
        const whatsappAdapter = new WhatsAppWebAdapter(this.client);
        await whatsappAdapter.sendMessage(
          message.from,
          '❌ Sorry, an error occurred. Please try again later.'
        );
      }
    });

    // Disconnected event
    this.client.on('disconnected', () => {
      console.log('⚠️ Bot disconnected. Attempting to reconnect...');
    });

    // Error handling
    this.client.on('error', (error) => {
      console.error('❌ WhatsApp client error:', error);
    });

    // Initialize client
    this.client.initialize();
  }

  async shutdown() {
    console.log('\n🛑 Shutting down bot...');
    if (this.client) {
      await this.client.destroy();
    }
    if (this.container) {
      await this.container.close();
    }
    console.log('✅ Bot shutdown complete');
    process.exit(0);
  }

  start() {
    // Handle shutdown signals
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());

    console.log('🚀 Driving School Bot is running...');
  }
}

// Main execution
async function main() {
  try {
    const bot = new DrivingSchoolBot();
    await bot.initialize();
    bot.start();
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = DrivingSchoolBot;
