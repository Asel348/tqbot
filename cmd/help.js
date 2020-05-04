module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        message.channel.send("```--- EĞLENCE --- \n01 - ..catto\n02 - ..doggo\n03 - ..flip\n04 - ..pick [sayı] [arg1] [arg2] ... [argn]\n05 - ..ping\n06 - ..vote [saniye] [başlık]\n07 - ..birb\n\n --- MODERASYON --- \n01 - ..ban [mention] [neden]\n02 - ..kick [mention] [neden]\n03 - ..mute [mention]\n04 - ..unmute [mention]\n05 - ..clear [temizlenecek mesaj sayısı] [true/false]\n\n --- MÜZİK --- \n01 - ..play [url/arama terimi]\n02 - ..skip\n03 - ..stop\n04 - ..q\n05 - ..v [0-5]\n06 - ..np\n07 - ..pause\n08 - ..resume```")

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "``` <@!294910512783949825> ");
        console.error(err.stack);
        
    }
}

module.exports.help = {
    name: "help"
}