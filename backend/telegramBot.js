import TelegramBot from "node-telegram-bot-api";
import Lead from "./models/Lead.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/.env"
});

connectDB();

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("❌ BOT TOKEN missing in .env");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
console.log("🤖 LeadFlow CRM Bot is running...");


bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! I am your LeadFlow CRM bot 🤖\n\nCommands:\n/addlead [Name] [Email] [Status]\n/leads - View recent leads\n/refresh - Force refresh data\n/stats - View metrics");
});

bot.onText(/\/addlead (.+)/, async (msg, match) => {
  try {
    const input = match[1].split(" ");

    if (input.length < 3) {
      return bot.sendMessage(msg.chat.id, "❌ Usage: /addlead Name Email Status");
    }

    const status = input.pop();  
    const email = input.pop();   
    const name = input.join(" "); 

    await Lead.create({ name, email, status });

    await bot.sendMessage(
      msg.chat.id,
      `✅ Lead added successfully!\n👤 Name: ${name}\n📧 Email: ${email}\n📌 Status: ${status}\n\nType /refresh to see updated list.`
    );
  } catch (error) {
    console.error("Add Lead Error:", error);
    bot.sendMessage(msg.chat.id, "❌ Error adding lead. Ensure the email is unique.");
  }
});

bot.onText(/\/(leads|refresh)/, async (msg) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(10);
    
    if (leads.length === 0) {
      return bot.sendMessage(msg.chat.id, "📭 No leads found in the database.");
    }

    let response = "📋 **Latest Leads (Refreshed):**\n\n";
    leads.forEach((l, index) => {
      response += `${index + 1}. ${l.name} | ${l.email} | [${l.status.toUpperCase()}]\n`;
    });

    bot.sendMessage(msg.chat.id, response, { parse_mode: "Markdown" });
  } catch (error) {
    console.error("Refresh Error:", error);
    bot.sendMessage(msg.chat.id, "❌ Error fetching updated data.");
  }
});

bot.onText(/\/stats/, async (msg) => {
  try {
    const total = await Lead.countDocuments();
    const closed = await Lead.countDocuments({ status: "closed" });
    const percent = total > 0 ? (closed / total) * 100 : 0;

    bot.sendMessage(
      msg.chat.id,
      `📊 **CRM Stats:**\n\nTotal Leads: ${total}\nClosed: ${closed}\nConversion: ${percent.toFixed(2)}%`,
      { parse_mode: "Markdown" }
    );
  } catch (error) {
    console.error("Stats Error:", error);
    bot.sendMessage(msg.chat.id, "❌ Error calculating stats.");
  }
});