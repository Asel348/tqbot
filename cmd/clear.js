module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        const messagesToClean = args[0];
        const cleanMine = args[1];

        if (!messagesToClean) return message.channel.send("Lütfen temizlenecek mesaj sayısını belirtin.");
        if (isNaN(messagesToClean)) return message.channel.send("Geçersiz sayı girildi.");

        if (messagesToClean > 100) return message.channel.send("100'den fazla mesaj silinemiyor.");
        if (messagesToClean < 1) return message.channel.send("Sayı 1'den az olamaz.");
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I need the **Manage Messages** permission to properly function.");

        if (cleanMine === "true") {
            message.channel.fetchMessages({
                limit: messagesToClean
            }).then(messages => {
                message.channel.bulkDelete(messages);
                message.channel.send(`Kendi mesajın ile beraber ${messagesToClean} mesaj temizlendi.`).then(msg => msg.delete(5000));
            });

        } else {
            message.channel.fetchMessages({
                limit: parseInt(messagesToClean) + 1
            }).then(messages => {
                let msgArray = messages.array();
                msgArray.splice(0, 1);
                message.channel.bulkDelete(msgArray);
                message.channel.send(`${messagesToClean} mesaj temizlendi.`).then(msg => msg.delete(5000));
            });
        };

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "```");
        console.error(err.stack);

    }
}

module.exports.help = {
    name: "clear"
}