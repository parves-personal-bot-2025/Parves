const fs = global.nodemodule["fs-extra"];
const path = require("path");

module.exports.config = {
 name: "savelist",
 version: "1.1.0",
 hasPermssion: 0,
 credits: "Shahadat",
 description: "Show saved media file names",
 commandCategory: "utility",
 usages: "[savelist]",
 cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
 const { threadID, messageID } = event;

 const folderPath = path.join(__dirname, "cache", "savedMedia");

 try {
 if (!fs.existsSync(folderPath)) {
 return api.sendMessage("⚠️ এখনো কোনো মিডিয়া সেভ করা হয়নি!", threadID, messageID);
 }

 const files = fs.readdirSync(folderPath);

 if (files.length === 0) {
 return api.sendMessage("⚠️ কোনো ফাইল খুঁজে পাওয়া যায়নি!", threadID, messageID);
 }

 const photos = files.filter(file => file.endsWith(".jpg"));
 const videos = files.filter(file => file.endsWith(".mp4"));

 let msg = "🖼 Saved Photos:\n";
 msg += photos.map((f, i) => `${i + 1}. ${f}`).join("\n") || "❌ কোনো ছবি নেই";

 msg += "\n\n🎥 Saved Videos:\n";
 msg += videos.map((f, i) => `${i + 1}. ${f}`).join("\n") || "❌ কোনো ভিডিও নেই";

 return api.sendMessage(msg, threadID, messageID);
 } catch (e) {
 console.error(e);
 return api.sendMessage("❌ মিডিয়া লিস্ট দেখাতে সমস্যা হয়েছে।", threadID, messageID);
 }
};
