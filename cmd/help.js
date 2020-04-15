module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        message.channel.send("```--- EĞLENCE --- \n01 - ..catto\n02 - ..doggo\n03 - ..flip\n04 - ..pick [sayı] [arg1] [arg2] ... [argn]\n05 - ..ping\n06 - ..vote [saniye] [başlık]\n07 - ..birb\n\n --- MODERASYON --- \n01 - ..ban [mention] [neden]\n02 - ..kick [mention] [neden]\n03 - ..mute [mention]\n04 - ..unmute [mention]\n05 - ..clear [temizlenecek mesaj sayısı] [true/false]```")

    } catch (err) {

        message.channel.send("Oh no! An error occured: ```javascript\n" + err + "```");
        console.error(err.stack);
        
    }
}

module.exports.help = {
    name: "help"
}