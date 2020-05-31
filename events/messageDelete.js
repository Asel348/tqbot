const Discord = require('discord.js');

module.exports = (client, message) => {

    const msgEmbed = new Discord.RichEmbed()
        .setColor("#f7f7f7")
        .setTitle("**MESAJ SİLİNDİ**")
        .setURL("https://www.idk.com/")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(message.content)
        .addField("Kanal:", message.channel.name)
        .setTimestamp();

    //console.log(message);
    if (message.guild.id === "461916478346887168") {
        message.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
    }
}