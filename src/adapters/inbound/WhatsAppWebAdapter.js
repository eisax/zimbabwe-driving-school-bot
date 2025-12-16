/**
 * WhatsApp Web.js Message Adapter
 * Implements WhatsAppMessagePort using whatsapp-web.js
 */
const WhatsAppMessagePort = require('../../ports/WhatsAppMessagePort');

class WhatsAppWebAdapter extends WhatsAppMessagePort {
  constructor(client) {
    super();
    this.client = client;
  }

  async sendMessage(chatId, message) {
    try {
      const chat = await this.client.getChatById(chatId);
      await chat.sendMessage(message);
      return {
        success: true,
        messageId: chatId,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendMediaMessage(chatId, mediaUrl, caption = '') {
    try {
      const { MessageMedia } = require('whatsapp-web.js');
      // For local files
      if (mediaUrl.startsWith('/') || mediaUrl.startsWith('.')) {
        const fs = require('fs');
        const path = require('path');
        const buffer = fs.readFileSync(mediaUrl);
        const filename = path.basename(mediaUrl);
        const mimetype = this.getMimeType(filename);
        const media = new MessageMedia(mimetype, buffer.toString('base64'), filename);
        const chat = await this.client.getChatById(chatId);
        await chat.sendMessage(media, { caption });
      } else {
        // For URLs
        const axios = require('axios');
        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        const filename = mediaUrl.split('/').pop() || 'image.jpg';
        const mimetype = this.getMimeType(filename);
        const media = new MessageMedia(mimetype, buffer.toString('base64'), filename);
        const chat = await this.client.getChatById(chatId);
        await chat.sendMessage(media, { caption });
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendButtonMessage(chatId, text, buttons) {
    try {
      const chat = await this.client.getChatById(chatId);
      const buttonList = buttons.map((btn, idx) => `${idx + 1}. ${btn}`).join('\n');
      const message = `${text}\n\n${buttonList}`;
      await chat.sendMessage(message);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendListMessage(chatId, title, items) {
    try {
      const chat = await this.client.getChatById(chatId);
      const itemsList = items.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
      const message = `*${title}*\n\n${itemsList}`;
      await chat.sendMessage(message);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  getMimeType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }
}

module.exports = WhatsAppWebAdapter;
