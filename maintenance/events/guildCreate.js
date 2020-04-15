module.exports = (client, guild) => {
    client.channels.get("channel_id").send(`**NEW SERVER**\nThe bot just joined the guild: ${guild.name} (${guild.id}). This guild has ${guild.members.size} members. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
}