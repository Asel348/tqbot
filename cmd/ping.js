module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        // Send the ping message.
        const msg = await message.channel.send("Ping?");
        msg.edit(`:ping_pong: Pong! Ping: ${msg.createdTimestamp - message.createdTimestamp}ms. API Pingi: ${Math.round(client.ping)}ms.`);

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "```  <@!294910512783949825> ");
        console.error(err.stack);
        
    }
}

module.exports.help = {
    name: "ping"
}