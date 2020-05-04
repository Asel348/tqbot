// MAIN REQUIREMENTS //
const Discord = require('discord.js');
const {
    Util
} = require('discord.js');
const client = new Discord.Client();
const {
    promisify
} = require('util');
// const config = require('./config.json');
const fs = require("fs");
const readdir = promisify(require("fs").readdir);
const ytdl = require("ytdl-core");
const ytsearch = require("yt-search");

// yay

// CONSTANT VARIABLES //
const PREFIX = "..";
const TOKEN = process.env.token;

const queue = new Map();

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

// I needed to write the music commands in this file pls dont ask why
client.on('message', async message => {

    if (message.author.bot) return;

    if (!message.guild) return;

    // Setting the arguments (--command arg[0] arg[1] arg[2] ... arg[n])
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let arguments = message.content.split(' ');

    if (message.content.indexOf(PREFIX) !== 0) return;

    const serverQueue = queue.get(message.guild.id);

    const searchArgs = arguments.slice(1).join(' ');

    let cmd = client.commands.get(command.slice(PREFIX.length))
    if (cmd) cmd.run(client, message, args, arguments);

    if (command === "..play") {
        try {

            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.reply("bir ses kanalında olmadan bu komutu kullanamazsın.");

            let songInfo;
            let song;

            if (args[0].startsWith("http")) {
                songInfo = await ytdl.getInfo(args[0]);
                song = {
                    title: Util.escapeMarkdown(songInfo.title),
                    url: songInfo.video_url
                }
            } else {
                var searchResult = await ytsearch(searchArgs);
                songInfo = await ytdl.getInfo(searchResult.videos[0].url);
                song = {
                    title: Util.escapeMarkdown(songInfo.title),
                    url: songInfo.video_url
                }
            }

            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };

                queue.set(message.guild.id, queueConstruct);

                queueConstruct.songs.push(song);

                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);

            } else {
                serverQueue.songs.push(song);
                message.channel.send(`**${song.title}** sıraya eklendi.`)
            }
        } catch (err) {

            message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "```  <@!294910512783949825> ");
            queue.delete(message.guild.id);
            console.error(err.stack);

        }
    } else if (command === "..skip") {

        if (!message.member.voiceChannel) return message.reply("bir ses kanalında olmadan bu komutu kullanamazsın.");
        if (!serverQueue) return;
        serverQueue.connection.dispatcher.end();

    } else if (command === "..stop") {
        try {

            if (!message.member.voiceChannel) return message.reply("bir ses kanalında olmadan bu komutu kullanamazsın.");
            if (!serverQueue) return;
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();

        } catch (err) {

            message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "```  <@!294910512783949825> ");
            console.error(err.stack);

        }
    } else if (command === "..v") {

        if (!serverQueue) return message.reply("şu anda hiçbir şey oynatılmıyor.");
        if (!args[0]) return message.channel.send(`Şu anda ses yüksekliği: **${serverQueue.volume}**`)
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        return message.channel.send(`Şu anda ses yüksekliği: **${args[0]}**`)

    } else if (command === "..np") {
        if (!serverQueue) return message.reply("şu anda hiçbir şey oynatılmıyor.");
        return message.channel.send(`**${serverQueue.songs[0].title}** şu anda oynatılıyor.`)
    } else if (command === "..q") {
        if (!serverQueue) return message.reply("şu anda hiçbir şey oynatılmıyor.");
        return message.channel.send(`
__**Video sırası:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join(`\n`)}

**Şu anda oynatılıyor:** ${serverQueue.songs[0].title}
        `);
    } else if (command === "..pause") {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.react("⏸️");
        }
        return message.reply("şu anda hiçbir şey oynatılmıyor.");
    } else if (command === "..resume") {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.react("▶️")
        }
        return message.reply("şu anda hiçbir şey oynatılmıyor.");
    }
})

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', () => {
            console.error;
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`**${song.title}** şimdi oynatılıyor.`)
}

// Log in the client
client.login(TOKEN);