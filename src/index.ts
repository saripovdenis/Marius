import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();

const token: string = process.env.TELEGRAM_BOT_TOKEN as string;
if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing in .env file");
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// A Set of user chat IDs who have interacted with the bot
const userChatIds = new Set<number>();

// Listen for any message
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text || "";

    // Store user chat ID so we can send them scheduled messages
    userChatIds.add(chatId);

    // Simple /start command response
    if (text === "/start") {
        bot.sendMessage(chatId, "Hi there👋");
    } else {
        bot.sendMessage(chatId, `You said: ${text}.`);
    }
});

// Schedule a daily message at 23:00 Europe/Belgrade time
cron.schedule(
    "0 23 * * *",
    () => {
        userChatIds.forEach((chatId) => {
            bot.sendMessage(chatId, "What did you do today? What are your plans for tomorrow?");
        });
        console.log("Daily message sent at 23:00 Belgrade time");
    },
    {
        timezone: "Europe/Belgrade",
    }
);

console.log("Bot is running...");
