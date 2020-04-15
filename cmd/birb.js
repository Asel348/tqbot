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

        msg.delete();

    } catch (err) {

        message.channel.send("Oh no! An error occured: ```javascript\n" + err + "```");
        console.error(err.stack);

    }
}

module.exports.help = {
    name: "birb"
}