const Discord = require('discord.js');
const PREFIX = "..";
module.exports = async (client, message) => {

    if (message.author.bot) return;

    if (!message.guild) return;

    // Setting the arguments (--command arg[0] arg[1] arg[2] ... arg[n])
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let arguments = message.content.split(' ');

    if (message.content.indexOf(PREFIX) !== 0) return;

    let cmd = client.commands.get(command.slice(PREFIX.length))
    if (cmd) cmd.run(client, message, args, arguments);

};