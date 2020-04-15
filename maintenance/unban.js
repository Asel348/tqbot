module.exports.run = async (client, message, args) => {

    // If the message was sent via DM, stop.
    if (!message.guild) return message.reply("You can't use this command in DM!");

    // Declare constant variables.
    let user = args[0];
    const arguments = message.content.split(' ');
    const reason = arguments.slice(2).join(' ');

    // If the bot has insufficent permissions, stop.
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I need the **Administrator** permission to properly function.");

    // If the mention does not exist, stop.
    if (!args[0]) return message.reply("Please provide an ID and an optional reason.");

    // If the user exists
    if (user) {
        
        // If the user doesn't have the permissions to unban members, stop.
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You have insufficent permissions to unban a member.");

        // If the user is a mention:
        if (user.startsWith("<@")) user = user.slice(2, 20);
        // If not, it's an id, so it should parse to an integer successfully.
        else parseInt(user);
        // If it couldn't parse to an integer, stop.
        if (isNaN(user)) return message.reply("Please provide a valid **ID** or a **mention** and an optional reason.");

        // If the mutee is the bot itself, stop.
        if (user === client.user.id) return message.reply("I cannot unban myself!");

        // If the reason exists:
        if (args[1]) {

            // Unban the member.
            message.guild.unban(user, [`User ID: ${user} has been unbanned by ${message.author.tag}(ID: ${message.author.id}). Reason: ${reason}`]).then(() => {
                message.reply(`<@${user}> has been unbanned. \n**__Reason:__ ${reason}**`);
                // Did domething happen? Stop.
            }).catch(e => {
                message.reply("Unable to unban. The ban probably doesn't exist.");
            });
            return;
            // If the reason doesn't exists:
        } else {
            // Unban the member.
            message.guild.unban(user, [`User ID: ${user} has been unbanned by ${message.author.tag}(ID: ${message.author.id}). No reason provided.`]).then(() => {
                message.reply(`<@${user}> has been unbanned. No reason provided.`);
                // Did something happen? Stop.
            }).catch(e => {
                message.reply("Unable to unban. The ban probably doesn't exist.");
            });
        }
        // If anything except above happens, stop.
    } else {
        message.reply("Please provide **a valid ID** and an optional reason.")
    }
}

module.exports.help = {
    name: "unban"
}