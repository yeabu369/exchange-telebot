const Telegraf = require("telegraf");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const Scene = require("telegraf/scenes/base");
const { leave } = Stage;
const stage = new Stage();

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const getName = new Scene("getName");
stage.register(getName);
const getId = new Scene("getId");
stage.register(getId);
const getGender = new Scene("getGender");
stage.register(getGender);

bot.use(session());
bot.use(stage.middleware());

user = {
  isRegistered: false,
};

bot.start((ctx) => {
  ctx.reply(
    "Hello, I am Rasp-Face-Cog-Bot. You can send me pictures for face recognition. Enter your first name and last name first.",
    { reply_markup: { remove_keyboard: true } }
  );
  ctx.scene.enter("getName");
});

getName.command("start", async (ctx) => {
  ctx.reply("Let's start over. Enter first name, last name and patronymic", {
    reply_markup: { remove_keyboard: true },
  });
  await ctx.scene.leave("getEduc");
  ctx.scene.enter("getName");
});

getName.on("text", async (ctx) => {
  if (ctx.message.text === "◀️ Back") {
    return ctx.reply(
      "You are already back at the very beginning. Please enter your name"
    );
  }

  ctx.session.name = ctx.message.text;
  ctx.reply(
    "Enter your Gender" +
      `\n\nAlready entered data:\nFULL NAME: ${ctx.session.name}`,
    {
      reply_markup: {
        keyboard: [["◀️ Back"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
  await ctx.scene.leave("getName");
  ctx.scene.enter("getId");
});

getId.on("text", async (ctx) => {
  
});

const helpMessage = `Here are the list of commands:
/start - Starts the bot
/help - Brings up the help text
/addphotos - Allows user to send 5 photos for face recognition
/Register - Registers a first time user`;

bot.help((ctx) => {
  ctx.reply(helpMessage);
});

bot.command(["addphotos", "AddPhotos", "addPhotos"], (ctx, next) => {
  ctx.reply("You can start sending 5 photos of your face now!");
});

bot.on("photo", (ctx, next) => {
  user.isRegistered
    ? ctx.reply("Thanks, but you have already been registered!")
    : next(ctx);
});

bot.command("register", (ctx) => {
  ctx.reply("Please enter your fullname below ...");
});

bot.startPolling();
