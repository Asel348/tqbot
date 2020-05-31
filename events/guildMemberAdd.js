const Discord = require('discord.js');

module.exports = (client, member, message) => {

    const msgEmbed = new Discord.RichEmbed()
        .setColor("#5cb85c")
        .setTitle("**YENİ ÜYE**")
        .setURL("https://www.idk.com/")
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setTimestamp();

    if (member.guild.id === "461916478346887168") {
        member.addRole(member.guild.roles.find(role => role.name === "Onaylanmamış"));
        member.send(`Hoş geldin <@!${member.id}>! Seni aramızda görmek çok güzel. Lütfen **TFM adını** ve **etiketini** (Örnek: nickName#1234) #üye-kayıt kanalına yaz ve bir yetkilinin seni onaylamasını bekle.`).catch(console.error);
        member.guild.channels.find(c => c.name === "kayıt-defteri").send(msgEmbed).catch(console.error);
    }
}