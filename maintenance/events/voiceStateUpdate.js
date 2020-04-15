const Discord = require('discord.js');
module.exports = (client, oldMember, newMember) => {

    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        const msgEmbed = new Discord.RichEmbed()
            .setColor("#81D152")
            .setTitle("**VOICE CHANNEL JOIN**")
            .setURL("https://www.idk.com/")
            .setAuthor(newMember.user.tag, newMember.user.avatarURL)
            .addField("In guild:", newMember.guild.name)
            .addField("In channel:", newMember.voiceChannel.name)
            .setTimestamp()
        client.channels.get("channel_id").send(msgEmbed);
    } else if (newUserChannel === undefined) {
        const msgEmbed = new Discord.RichEmbed()
            .setColor("#FF5347")
            .setTitle("**VOICE CHANNEL LEFT**")
            .setURL("https://www.idk.com/")
            .setAuthor(oldMember.user.tag, oldMember.user.avatarURL)
            .addField("In guild:", oldMember.guild.name)
            .addField("In channel:", oldMember.voiceChannel.name)
            .setTimestamp()
        client.channels.get("channel_id").send(msgEmbed);
    }

}