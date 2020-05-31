const Discord = require('discord.js');

module.exports = (client, member, message) => {

    const msgEmbed = new Discord.RichEmbed()
        .setColor("#292b2c")
        .setTitle("**ÜYE AYRILDI**")
        .setURL("https://www.idk.com/")
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setTimestamp();

    if (member.guild.id === "461916478346887168") {
        member.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
    }
}