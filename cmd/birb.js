const snek = module.require("snekfetch");
const api = "https://some-random-api.ml/img/birb";

module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        let url = (await snek.get(api)).body.link;
        if (!url) return message.channel.send("Bir şeyler oldu! Yeniden dene.");

        await message.channel.send(undefined, {
            file: url
        });

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "``` <@!294910512783949825> ");
        console.error(err.stack);

    }
}

module.exports.help = {
    name: "birb"
}