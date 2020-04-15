module.exports = async (client, error, message) => {
    message.channel.send(`Oh hayır! Bot bir hata ile karşılaştı: \n\`\`\`${JSON.stringify(error)}\`\`\`.\nLütfen bu durumu Asil#1514'e bildirin.`);
    console.error(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
}