module.exports = async client => {
    console.log(`\nHazır!`)
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
    console.log(`Invite link: ${await client.generateInvite(["ADMINISTRATOR"])}`)
    client.user.setStatus("online");
    client.user.setActivity("..help");
};