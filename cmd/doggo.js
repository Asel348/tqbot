const snek = module.require("snekfetch");
const api = "https://random.dog/woof.json";

module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        let msg = await message.channel.send("Generating...");

        let url = (await snek.get(api)).body.url;
        if (!url) return message.channel.send("Bir şeyler oldu! Yeniden dene.");

        await message.channel.send(undefined, {
            file: url
        });

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "```");
        console.error(err.stack);

    }
}

module.exports.help = {
    name: "doggo"
}