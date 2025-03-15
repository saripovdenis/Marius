import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token: string = process.env.TELEGRAM_BOT_TOKEN as string;

if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing in .env file");
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const userChatIds = new Set<number>(); // Store user chat IDs to send periodic messages

bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text || "";

    userChatIds.add(chatId); // Store user ID when they send a message

    if (text === "/start") {
        bot.sendMessage(chatId, "Welcome to my TypeScript bot!");
    } else {
        bot.sendMessage(chatId, `You said: ${text}.`);
    }
});

// Send "And guess what?" every 10 minutes to all active users
setInterval(() => {
    userChatIds.forEach(chatId => {
        bot.sendMessage(chatId, "And guess what?");
    });
}, 10 * 60 * 1000); // 10 minutes in milliseconds

console.log("Bot is running...");
