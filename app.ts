/* eslint-disable @typescript-eslint/no-floating-promises */
import { Scenes, session, Telegraf } from 'telegraf'
require('dotenv').config();

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf<Scenes.SceneContext>(token)

bot.start((ctx) => {
  ctx.reply(`Hello ${ctx.from.first_name}. I am face recognition bot. Send me a portrait of your face images please.`);
});

bot.on("photo", (ctx) => {
  console.log(ctx.message.photo);
});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))