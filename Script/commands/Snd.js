const fs = global.nodemodule["fs-extra"];
const path = require("path");

module.exports.config = {
 name: "snd",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "Shahadat",
 description: "Send previously saved photo or video by filename",
 commandCategory: "utility",
 usages: "/sendmedia [filename]",
 cooldowns: 3,
};

module.exports.run = async ({ api, event, args }) => {
 const { threadID, messageID } = event;

 if (!args[0]) {
 return api.sendMessage("⚠️ দয়া করে ফাইলের নাম দাও! যেমন: /sendmedia eid pic", threadID, messageID);
 }

 const folderPath = path.join(__dirname, "cache", "savedMedia");
 const inputName = args.join(" ");
 const possibleFiles = [".jpg", ".mp4"].map(ext => path.join(folderPath, inputName + ext));

 for (const filePath of possibleFiles) {
 if (fs.existsSync(filePath)) {
 return api.sendMessage({
 body: `✅ Here's your file: ${path.basename(filePath)}`,
 attachment: fs.createReadStream(filePath)
 }, threadID, messageID);
 }
 }

 return api.sendMessage("❌ ফাইল পাওয়া যায়নি! নামটি সঠিকভাবে দাও।", threadID, messageID);
};
