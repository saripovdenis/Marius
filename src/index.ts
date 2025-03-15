import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token: string = process.env.TELEGRAM_BOT_TOKEN as string;

if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing in .env file");
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text || "";

    if (text === "/start") {
        bot.sendMessage(chatId, "Welcome to my TypeScript bot!");
    } else {
        bot.sendMessage(chatId, `You said: ${text}. I LOVE SEALS`);
    }
});

console.log("Bot is running...");
