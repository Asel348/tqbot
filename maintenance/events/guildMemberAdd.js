module.exports = async (client, guild, member) => {
    let role = member.guild.roles.find(r => r.name === "Onaylanmamış");
    if (!role) {
        try {
            role = await message.guild.createRole({
                name: "Onaylanmamış",
                permissions: []
            });
            await member.addRole(role);
        } catch (e) {
            message.channel.send("Rol oluştururken bir hata meydana geldi: ```javascript\n" + e + "```\n Lütfen bu durumu Asil#1514'e bildirin.")
            console.log(e.stack)
        }
    }
}