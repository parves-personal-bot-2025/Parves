module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "𝐏𝐀𝐑𝐕𝐄𝐒 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓",
    description: "Notification only when bot joins group",
    dependencies: {
        "fs-extra": "",
        "path": ""
    }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache");
    if (!existsSync(path)) mkdirSync(path, { recursive: true }); 
};

module.exports.run = async function({ api, event }) {
    const { threadID } = event;
    const fs = require("fs");

    // যদি বটকেই গ্রুপে অ্যাড করা হয়
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${global.config.BOTNAME || "BOT"}`, threadID, api.getCurrentUserID());

        return api.sendMessage("", threadID, () =>
            api.sendMessage({
                body: `╭•┄┅═══❁🌺❁═══┅┄•╮\n   আসসালামু আলাইকুম-!!🖤💫\n╰•┄┅═══❁🌺❁═══┅┄•╯

________________________

𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐬𝐨 𝐦𝐮𝐜𝐡 𝐟𝐨𝐫 𝐚dd𝐢𝐧𝐠 𝐦𝐞 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐢-𝐠𝐫𝐨𝐮𝐩-🖤🤗

𝐈 𝐰𝐢𝐥𝐥 𝐚𝐥𝐰𝐚𝐲𝐬 𝐬𝐞𝐫𝐯𝐞 𝐲𝐨𝐮 𝐢𝐧𝐚𝐡𝐚𝐥𝐥𝐚𝐡 🌺❤️

________________________

𝐓𝐨 𝐯𝐢𝐞𝐰 𝐚𝐧𝐲 𝐜𝐨𝐦𝐦𝐚𝐧𝐝

${global.config.PREFIX}help
${global.config.PREFIX}manu

𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : 𝐏𝐀𝐑𝐕𝐄𝐒 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓 ⚠️

⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`,
                attachment: fs.createReadStream(__dirname + "/cache/Sahu.mp4")
            }, threadID)
        );
    }

    return;
};
