/**
 * WhatsApp Message Port
 * Interface for sending WhatsApp messages
 */
class WhatsAppMessagePort {
  async sendMessage(chatId, message) {
    throw new Error('sendMessage must be implemented');
  }

  async sendMediaMessage(chatId, mediaUrl, caption) {
    throw new Error('sendMediaMessage must be implemented');
  }

  async sendButtonMessage(chatId, text, buttons) {
    throw new Error('sendButtonMessage must be implemented');
  }

  async sendListMessage(chatId, title, items) {
    throw new Error('sendListMessage must be implemented');
  }
}

module.exports = WhatsAppMessagePort;
