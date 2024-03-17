const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: 'sdxl5',
    version: '1.0',
    author: 'Luis Lavigne',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'ai',
    guide: {
      en: '1 | DreamshaperXL10' +
        '\n2 | DynavisionXL' +
        '\n3 | JuggernautXL' +
        '\n4 | RealismEngineSDXL' +
        '\n5 | Sdxl 1.0'
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const permission = ["100089324680810"];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        `❌ | Command "sdxl" currently unavailable buy premium to use the command.`,
        event.threadID,
        event.messageID
      );
      return;
    }
    try {
      const info = args.join(' ');
      const [prompt, model] = info.split('|').map(item => item.trim());
      const text = args.join(" ");
      if (!text) {
        return message.reply("🦊 | Please provide a prompt!");
      }
      const modelParam = model || '2';
      const apiUrl = `https://turtle-apis.onrender.com/api/sdxl?prompt=${prompt}&model=${modelParam}`;

      await message.reply('⌛ | Creating your Imagination...');

      const form = {};
      form.attachment = [];
      form.attachment[0] = await global.utils.getStreamFromURL(apiUrl);

      message.reply(form);
    } catch (error) {
      console.error(error);
      await message.reply('🦊 | Sorry, API has a skill issue');
    }
  }
};
