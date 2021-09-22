"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-floating-promises */
var telegraf_1 = require("telegraf");
require('dotenv').config();
var token = process.env.BOT_TOKEN;
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!');
}
// Handler factories
var _a = telegraf_1.Scenes.Stage, enter = _a.enter, leave = _a.leave;
// Greeter scene
var greeterScene = new telegraf_1.Scenes.BaseScene('greeter');
greeterScene.enter(function (ctx) { return ctx.reply('Hi'); });
greeterScene.leave(function (ctx) { return ctx.reply('Bye'); });
greeterScene.hears('hi', enter('greeter'));
greeterScene.on('message', function (ctx) { return ctx.replyWithMarkdown('Send `hi`'); });
// Echo scene
var echoScene = new telegraf_1.Scenes.BaseScene('echo');
echoScene.enter(function (ctx) { return ctx.reply('echo scene'); });
echoScene.leave(function (ctx) { return ctx.reply('exiting echo scene'); });
echoScene.command('back', leave());
echoScene.on('text', function (ctx) { return ctx.reply(ctx.message.text); });
echoScene.on('message', function (ctx) { return ctx.reply('Only text messages please'); });
var bot = new telegraf_1.Telegraf(token);
var stage = new telegraf_1.Scenes.Stage([greeterScene, echoScene], {
    ttl: 10
});
bot.use((0, telegraf_1.session)());
bot.use(stage.middleware());
bot.command('greeter', function (ctx) { return ctx.scene.enter('greeter'); });
bot.command('echo', function (ctx) { return ctx.scene.enter('echo'); });
bot.on('message', function (ctx) { return ctx.reply('Try /echo or /greeter'); });
bot.launch();
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
