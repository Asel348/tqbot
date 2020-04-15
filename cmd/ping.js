module.exports.run = async (client, message, args) => {

    // using try/catch because why not
    try {

        // Send the ping message.
        const msg = await message.channel.send("Ping?");
        msg.edit(`:ping_pong: Pong! Ping: ${msg.createdTimestamp - message.createdTimestamp}ms. API Pingi: ${Math.round(client.ping)}ms.`);

    } catch (err) {

        message.channel.send("Oh no! An error occured: ```javascript\n" + err + "```");
        console.error(err.stack);
        
    }
}

module.exports.help = {
    name: "ping"
}