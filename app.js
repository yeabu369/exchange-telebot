const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "Hello, I am Rasp-Face-Cog-Bot. You can send me pictures for face recognition."
  );
});

const helpMessage = `Here are the list of commands:
/start - Starts the bot
/help - Brings up the help text
/addphotos - Allows user to send 5 photos for face recognition`;

bot.help((ctx) => {
  ctx.reply(helpMessage);
});

bot.command(['addphotos', 'AddPhotos', 'addPhotos'], (ctx, next) => {
    ctx.reply('You can start sending 5 photos of your face now!');
});

bot.launch();
