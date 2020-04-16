module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        var chance = Math.floor(Math.random() * 2);
        if (chance == 0) {
            message.channel.send("**YAZI** geldi.")
        } else {
            message.channel.send("**TURA** geldi.")
        }

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "``` <@!294910512783949825> ");
        console.error(err.stack);

    }
}

module.exports.help = {
    name: "flip"
}