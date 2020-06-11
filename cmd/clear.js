const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        const messagesToClean = args[0];
        const cleanMine = args[1];

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
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
                const msgEmbed = new Discord.RichEmbed()
                    .setColor("#f7f7f7")
                    .setTitle("**MESAJLAR SİLİNDİ**")
                    .setURL("https://www.idk.com/")
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(message.content)
                    .addField("Kanal:", message.channel.name)
                    .setTimestamp();
                if (message.guild.id === "461916478346887168") {
                    message.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
                }
            });

        } else {
            message.channel.fetchMessages({
                limit: parseInt(messagesToClean) + 1
            }).then(messages => {
                let msgArray = messages.array();
                msgArray.splice(0, 1);
                message.channel.bulkDelete(msgArray);
                message.channel.send(`${messagesToClean} mesaj temizlendi.`).then(msg => msg.delete(5000));
                const msgEmbed = new Discord.RichEmbed()
                    .setColor("#f7f7f7")
                    .setTitle("**MESAJLAR SİLİNDİ**")
                    .setURL("https://www.idk.com/")
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(message.content)
                    .addField("Kanal:", message.channel.name)
                    .setTimestamp();
                if (message.guild.id === "461916478346887168") {
                    message.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
                }
            });
        };

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "``` <@!294910512783949825>");
        console.error(err.stack);

    }
}

module.exports.help = {
    name: "clear"
}