module.exports = (client, member) => {
    member.addRole(member.guild.roles.find(role => role.name === "Onaylanmamış"));
    member.send(`Hoş geldin <@!${member.id}>! Seni aramızda görmek çok güzel. Lütfen **TFM adını** ve **etiketini** (Örnek: nickName#1234) #üye-kayıt kanalına yaz ve bir yetkilinin seni onaylamasını bekle.`).catch(console.error);
}