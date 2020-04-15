// MAIN REQUIREMENTS //
const Discord = require('discord.js');
const client = new Discord.Client();
const {
    promisify
} = require('util');
// const config = require('./config.json');
const fs = require("fs");
const readdir = promisify(require("fs").readdir);

// CONSTANT VARIABLES //
const PREFIX = "..";
const TOKEN = process.env.token;

// Read ./cmd/ and set the commands
client.commands = new Discord.Collection();
fs.readdir("./cmd/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.error("HATA: Yüklenecek komut bulunamadı.");
        return;
    }

    console.log(`${jsfiles.length} tane komut yükleniyor...`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmd/${f}`);
        console.log(`${i + 1}: ${f} yüklendi!`)
        client.commands.set(props.help.name, props);
    });
});

const eventFiles = async () => {

    const evtFiles = await readdir("./events/");
    console.log(`\n${evtFiles.length} event yükleniyor...`);
    if (evtFiles.length <= 0) return console.error("HATA: Yüklenecek event bulunamadı.");

    evtFiles.forEach((file, i) => {
        const eventName = file.split(".")[0];
        console.log(`${i + 1}: ${eventName} yüklendi!`);
        const event = require(`./events/${file}`);

        client.on(eventName, event.bind(null, client));
    });
};
eventFiles();

// Log in the client
client.login(TOKEN);