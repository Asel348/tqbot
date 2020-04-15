module.exports.run = async (client, message, args) => {

    // Declare constant variables.
    const user = message.mentions.users.first();
    const umember = message.guild.member(user);
    const arguments = message.content.split(' ');
    const reason = arguments.slice(2).join(' ');

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("I need the **Ban Members** permission to properly function.");

    // If the user exists:
    if (user) {

        // If the user is the message author itself, stop.
        if (user.id === message.author.id) return message.reply("Kendini banlayamazsın.");

        // If the user is the bot itself, stop.
        if (user.id === client.user.id) return message.reply("haha. güzel deneme, ama hayır.");

        // If the user doesn't have the permissions to ban members, stop.
        if (!message.member.hasPermission("BAN_MEMBERS")) return;

        // If the member has a lower or equal role as the user, stop.
        if (umember.highestRole.position >= message.member.highestRole.position) return message.reply("Senden yüksek ya da eşit rolde olan birini banlayamazsın.");

        if (umember.highestRole.position >= message.guild.me.highestRole.position) return message.channel.send("Kendimden yüksek ya da eşit rolde birini banlayamıyorum.");

        // If the reason exists:
        if (args[1]) {
            // Ban the member.
            umember.ban({
                reason: `${message.author.tag} tarafından banlandı. Neden: ${reason}`
            }).then(() => {
                message.reply(`${user} banlandı. \n**__Neden:__ ${reason}**`);
                // Did domething happen? Express it.
            }).catch(e => {
                message.reply("Şu anda bu kullanıcıyı banlayamıyorum: ```javascript\n" + e + "```\n Lütfen bu durumu Asil#1514'e bildirin.");
                console.error(e.stack);
            });
            return;
            // If the reason doesn't exists:
        } else {
            // Ban the member.
            umember.ban(`${message.author.tag} tarafından banlandı. Neden belirtilmedi.`).then(() => {
                message.reply(`${user} banlandı. Neden belirtilmedi.`);
                // Did something happen? Express it.
            }).catch(e => {
                message.reply("Şu anda bu kullanıcıyı banlayamıyorum: ```javascript\n" + e + "```\n Lütfen bu durumu Asil#1514'e bildirin.");
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

module.exports.help = {
    name: "ban"
}