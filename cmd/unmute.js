const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (message.member.roles.find(r => r.name === "Moderatör") || message.member.roles.find(r => r.name === "Kurucular") || message.member.roles.find(r => r.name === "Deneme Moderator") || message.member.roles.find(r => r.name === "Admin") || message.member.roles.find(r => r.name === "Developer")) {


        // using try/catch because why not
        try {

            // If the message sender does not have permission to manage messages, stop.
            //if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

            // Specify the mutee
            let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

            // If the mutee is the bot itself, stop.
            if (toMute.id === client.user.id) return;

            // If the mutee isn't present in the message, stop.
            if (!toMute) return message.channel.send("Kulanıcı belirtilmedi.");

            // If the message contains the message sender's information, stop.
            if (toMute.id === message.author.id) return message.channel.send("Kendin susturmanı kaldıramazsın.")

            // If the mutee has a higher role than the message sender, stop.
            if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("Senden yüksek veya eşit rolde olan bir kullanıcının susturmasını kaldıramazsın.");

            // Find the "Muted" role.
            let role = message.guild.roles.find(r => r.name === "Mute");
            let oRole = message.guild.roles.find(r => r.name === "Onaylı Üye");

            // If the mutee isn't muted, stop.
            if (!role || !toMute.roles.has(role.id)) return message.channel.send("Bu kullanıcı susturulmamış.")

            // Unmute the mutee.
            await toMute.removeRole(role);
            await toMute.addRole(oRole);
            message.channel.send(`${toMute} kullanıcısının susturulması kaldırıldı.`)
            const msgEmbed = new Discord.RichEmbed()
                .setColor("#5bc0de")
                .setTitle("**KULLANICININ SUSTURULMASI KALDIRILDI**")
                .setURL("https://www.idk.com/")
                .setAuthor(toMute.user.tag, toMute.user.avatarURL)
                .setTimestamp();
            toMute.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);

            return;
        } catch (err) {
            message.channel.send("Şu anda bu kullanıcının susturmasını kaldıramıyorum: ```javascript\n" + err + "```\n <@!294910512783949825> ");
            console.error(err.stack);
        }
    }
}

module.exports.help = {
    name: "unmute"
}