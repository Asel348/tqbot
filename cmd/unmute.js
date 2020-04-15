module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        // If the message sender does not have permission to manage messages, stop.
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

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

        // If the mutee isn't muted, stop.
        if (!role || !toMute.roles.has(role.id)) return message.channel.send("Bu kullanıcı susturulmamış.")

        // Unmute the mutee.
        await toMute.setMute(false);
        await toMute.removeRole(role);
        message.channel.send(`${toMute} kullanıcısının susturulması kaldırıldı.`)

        return;
    } catch (err) {
        message.channel.send("Şu anda bu kullanıcının susturmasını kaldıramıyorum: ```javascript\n" + e + "```\n Lütfen bu durumu Asil#1514'e bildirin.");
        console.error(err.stack);
    }
}

module.exports.help = {
    name: "unmute"
}