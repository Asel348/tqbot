const Discord = require('discord.js');

module.exports.run = async (client, message, args, arguments) => {

    // Declare constant variables.
    const user = message.mentions.users.first();
    const umember = message.guild.member(user);
    const reason = arguments.slice(2).join(' ');

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I need the **Kick Members** permission to properly function.");

    if (message.member.roles.find(r => r.name === "Moderatör") || message.member.roles.find(r => r.name === "Kurucular") || message.member.roles.find(r => r.name === "Admin") || message.member.roles.find(r => r.name === "Developer")) {

        // If the user exists:
        if (user) {

            // If the user doesn't have the permissions to kick members, stop.
            //if (!message.member.hasPermission("KICK_MEMBERS")) return;

            // If the user is the bot itself, stop.
            if (user.id === client.user.id) return message.reply("haha. güzel deneme, ama hayır.");

            // If the user is the message author itself, stop.
            if (user.id === message.author.id) return message.reply("Kendini atamazsın.");

            // If the member has a lower or equal role as the user, stop.
            if (umember.highestRole.position >= message.member.highestRole.position) return message.reply("Senden yüksek ya da eşit rolde olan birini atamazsın.");

            if (umember.highestRole.position >= message.guild.me.highestRole.position) return message.channel.send("Kendimden yüksek ya da eşit rolde olan birini atamıyorum.");

            // If the reason exists:
            if (args[1]) {
                // Kick the member.
                umember.kick(`${message.author.tag} tarafıncan atıldı. Neden: ${reason}`).then(() => {
                    message.reply(`${user} atıldı. \n**__Neden:__ ${reason}**`);
                    const msgEmbed = new Discord.RichEmbed()
                        .setColor("#f0ad4e")
                        .setTitle("**KULLANICI ATILDI**")
                        .setURL("https://www.idk.com/")
                        .setAuthor(user.tag, user.avatarURL)
                        .setDescription(`**__Neden:__ ${reason}**`)
                        .setTimestamp();
                    umember.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
                    // Did domething happen? Express it.
                }).catch(e => {
                    message.reply("Şu anda bu kullanıcıyı atamıyorum: ```javascript\n" + e + "```\n <@!294910512783949825> ");
                    console.error(e.stack);
                });
                return;
                // If the reason doesn't exists:
            } else {
                // Kick the member.
                umember.kick(`${message.author.tag} tarafından atıldı. Neden belirtilmedi.`).then(() => {
                    message.reply(`${user} atıldı. Neden belirtilmedi.`);
                    const msgEmbed = new Discord.RichEmbed()
                        .setColor("#f0ad4e")
                        .setTitle("**KULLANICI ATILDI**")
                        .setURL("https://www.idk.com/")
                        .setAuthor(user.tag, user.avatarURL)
                        .setDescription(`Neden belirtilmedi.`)
                        .setTimestamp();
                    umember.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
                    // Did something happen? Express it.
                }).catch(e => {
                    if (e.message === "Missing Access" || "Missing Permissions") {
                        message.reply("Şu anda bu kullanıcıyı atamıyorum: ```javascript\n" + e + "```\n  <@!294910512783949825> ");
                        console.error(e.stack);
                        return;
                    } else {
                        message.reply("Şu anda bu kullanıcıyı atamıyorum: ```javascript\n" + e + "```\n <@!294910512783949825> ");
                        console.error(e.stack);
                    }
                });
            }
            // If the mention doesn't exists, stop.
        } else if (!args[0]) {
            message.reply("Lütfen bir kullanıcı ve neden belirtin.");
            // If the user isn't present in the guild, stop.
        } else if (args[0].startsWith("<@")) {
            message.reply("Bu kullanıcı bu sunucuda bulunmuyor.");
            // If anything except above happens, stop.
        } else {
            message.reply("Lütfen geçerli bir **mention** ve neden belirtin.")
        }
    }
}

module.exports.help = {
    name: "kick"
}