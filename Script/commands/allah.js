const login = require('facebook-chat-api');

login({email: "আপনার_ইমেইল", password: "আপনার_পাসওয়ার্ড"}, (err, api) => {
    if(err) return console.error(err);

    api.listenMqtt((err, message) => {
        if (message.body === '!kickalladmin') {
            api.getThreadInfo(message.threadID, (err, info) => {
                if (err) return api.sendMessage('Could not get group info.', message.threadID);
                if (!info.isGroup) return api.sendMessage('This command only works in groups!', message.threadID);

                const botID = api.getCurrentUserID();
                const toKick = info.participantIDs.filter(id => id !== botID);

                if (toKick.length === 0) return api.sendMessage('No members to remove.', message.threadID);

                toKick.forEach(userId => {
                    api.removeUserFromGroup(userId, message.threadID, err => {
                        if (err) api.sendMessage(`Could not remove ${userId}`, message.threadID);
                    });
                });
                api.sendMessage('Removed everyone except the bot from the group.', message.threadID);
            });
        }
    });
});