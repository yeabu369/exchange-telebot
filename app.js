"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-floating-promises */
var telegraf_1 = require("telegraf");
require('dotenv').config();
var token = process.env.BOT_TOKEN;
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!');
}
var bot = new telegraf_1.Telegraf(token);
bot.start(function (ctx) {
    ctx.reply("Hello " + ctx.from.first_name + ". I am face recognition bot. Send me a portrait of your face images please.");
});
bot.on("photo", function (ctx) {
    console.log(ctx.message.photo);
});
bot.launch();
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
