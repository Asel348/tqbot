module.exports.run = async (client, message, args) => {

    const user = message.mentions.users.first();

    // using try/catch because why not
    try {

        if (args[0]) {
            if (!user.avatarURL) return message.reply("kullanıcının bir profil resmi bulunmuyor.");
            message.channel.send(user.avatarURL);
        } else {
            if (message.author.avatarURL) return message.reply("bir profil resmin bulunmuyor.");
            message.channel.send(message.author.avatarURL);
        }

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "```  <@!294910512783949825> ");
        console.error(err.stack);
        
    }
}

module.exports.help = {
    name: "avatar"
}