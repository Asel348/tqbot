module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        // Specify the mutee
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

        if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.reply("I need the **Mute Members** permission to properly function.");

        // If the message sender does not have permission to manage messages, stop.
        if (!message.member.hasPermission("MUTE_MEMBERS")) return;

        // If the mutee is the bot itself, stop.
        if (toMute.id === client.user.id) return message.reply("haha. güzel deneme, ama hayır.");

        // If the mutee isn't present in the message, stop.
        if (!toMute) return message.channel.send("Lütfen bir kullanıcı belirtin.");

        // If the message contains the message sender's information, stop.
        if (toMute.id === message.author.id) return message.channel.send("Kendini susturamazsın.")

        // If the mutee has a higher role than the message sender, stop.
        if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("Senden yüksek ya da aynı rolde olan birini susturamam.");

        if (toMute.highestRole.position >= message.guild.me.highestRole.position) return message.channel.send("Benden yüksek ya da aynı rolde olan birini susturamam.");

        // Find the "Muted" role. If there is no such role, create.
        let role = message.guild.roles.find(r => r.name === "Mute");
        if (!role) {
            try {
                role = await message.guild.createRole({
                    name: "Mute",
                    color: "#111111",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                })
            } catch (e) {
                message.channel.send("Rol oluştururken bir hata meydana geldi: ```javascript\n" + e + "```\n <@!294910512783949825> ")
                console.log(e.stack)
            }
        }

        // If the mutee is already muted, stop.
        if (toMute.roles.has(role.id)) return message.channel.send("Bu kullanıcı zaten susturulmuş.")

        // Mute the mutee.
        await toMute.addRole(role);
        await toMute.setMute(true);
        message.channel.send(`${toMute} susturuldu.`)

        return;
    } catch (err) {
        message.channel.send("Bir hata meydana geldi: ```javascript\n" + e + "```\n <@!294910512783949825> ");
        console.error(err.stack);
    }
}

module.exports.help = {
    name: "mute"
}