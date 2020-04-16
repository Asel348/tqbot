const snek = module.require("snekfetch");
const api = "http://aws.random.cat/meow";

module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        let file = (await snek.get(api)).body.file;
        if (!file) return message.channel.send("Bir şeyler oldu! Yeniden dene.");

        await message.channel.send({
            files: [{
                attachment: file,
                name: file.split("/").pop()
            }]
        });

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "``` <@!294910512783949825> ");
        console.error(err.stack);

    }
}

module.exports.help = {
    name: "catto"
}