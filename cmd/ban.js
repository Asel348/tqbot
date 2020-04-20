const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // Declare constant variables.
    const user = message.mentions.users.first();
    const umember = message.guild.member(user);
    const arguments = message.content.split(' ');
    const reason = arguments.slice(2).join(' ');

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("I need the **Ban Members** permission to properly function.");

    if (message.member.roles.find(r => r.name === "Moderatör") || message.member.roles.find(r => r.name === "Kurucular")) {

        // If the user exists:
        if (user) {

            // If the user is the message author itself, stop.
            if (user.id === message.author.id) return message.reply("Kendini yasaklayamazsın.");

            // If the user is the bot itself, stop.
            if (user.id === client.user.id) return message.reply("haha. güzel deneme, ama hayır.");

            // If the user doesn't have the permissions to ban members, stop.
            if (!message.member.hasPermission("BAN_MEMBERS")) return;

            // If the member has a lower or equal role as the user, stop.
            if (umember.highestRole.position >= message.member.highestRole.position) return message.reply("Senden yüksek ya da eşit rolde olan birini yasaklayamazsın.");

            if (umember.highestRole.position >= message.guild.me.highestRole.position) return message.channel.send("Kendimden yüksek ya da eşit rolde birini yasaklayamıyorum.");

            // If the reason exists:
            if (args[1]) {
                // Ban the member.
                umember.ban({
                    reason: `${message.author.tag} tarafından yasaklandı. Neden: ${reason}`
                }).then(() => {
                    message.reply(`${user} yasaklandı. \n**__Neden:__ ${reason}**`);
                    const msgEmbed = new Discord.RichEmbed()
                        .setColor("#d9534f")
                        .setTitle("**KULLANICI YASAKLANDI**")
                        .setURL("https://www.idk.com/")
                        .setAuthor(user.tag, user.avatarURL)
                        .setDescription(`**__Neden:__ ${reason}**`)
                        .setTimestamp();
                    umember.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
                    // Did domething happen? Express it.
                }).catch(e => {
                    message.reply("Şu anda bu kullanıcıyı yasaklayamıyorum: ```javascript\n" + e + "```\n <@!294910512783949825>");
                    console.error(e.stack);
                });
                return;
                // If the reason doesn't exists:
            } else {
                // Ban the member.
                umember.ban(`${message.author.tag} tarafından yasaklandı. Neden belirtilmedi.`).then(() => {
                    message.reply(`${user} yasaklandı. Neden belirtilmedi.`);
                    const msgEmbed = new Discord.RichEmbed()
                        .setColor("#d9534f")
                        .setTitle("**KULLANICI YASAKLANDI**")
                        .setURL("https://www.idk.com/")
                        .setAuthor(user.tag, user.avatarURL)
                        .setDescription(`Neden belirtilmedi.`)
                        .setTimestamp();
                    umember.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
                    // Did something happen? Express it.
                }).catch(e => {
                    message.reply("Şu anda bu kullanıcıyı yasaklayamıyorum: ```javascript\n" + e + "```\n <@!294910512783949825>");
                    console.error(e.stack);
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
    name: "ban"
}