module.exports = (client, guild) => {
    client.channels.get("channel_id").send(`**LOST SERVER**\nThe bot just left the guild: ${guild.name} (${guild.id}).`);
};