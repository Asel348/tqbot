const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {

    if (message.author.id !== "294910512783949825") return;

    const code = args.join(" ");
    try {
        const evaled = eval(code);
        message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
        console.error(err.stack);
    }
}

module.exports.help = {
    name: "eval"
}