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
const getPhotos = new Scene("getPhotos");
stage.register(getPhotos);

bot.use(session());
bot.use(stage.middleware());

user = {
  isRegistered: true,
};

const helpMessage = `Here are the list of commands:
/start - Starts the bot
/help - Brings up the help text
/addphotos - Allows user to send 5 photos for face recognition
/Register - Registers a first time user`;

bot.start((ctx) => {
  ctx.reply(
    "Hello, I am Rasp-Face-Cog-Bot. You can send me pictures for face recognition. Enter your first name and last name.",
    { reply_markup: { remove_keyboard: true } }
  );
  ctx.scene.enter("getName");
});

bot.help((ctx) => {
  ctx.reply(helpMessage);
});

getName.on("text", async (ctx) => {
  if (ctx.message.text === "◀️ Back") {
    ctx.reply(
      "You are already back at the very beginning. Please enter your name."
    );
    ctx.scene.enter("getName");
  } else {
    ctx.session.name = ctx.message.text;
    ctx.reply(
      "Next Upload 5 photos" +
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
    ctx.scene.enter("getPhotos");
  }
});

getPhotos.on("text", (ctx) => {
  if (ctx.message.text === "◀️ Back") {
    return ctx.reply(
      "You are already back at the very beginning. Please enter your name."
    );
  }
});

getPhotos.on("photo", (ctx, next) => {
  user.isRegistered
    ? ctx.reply("Thanks, but you have already been registered!")
    : next(ctx);
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
