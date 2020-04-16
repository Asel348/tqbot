module.exports.run = async (client, message, args, arguments) => {

    // using try/catch because why not
    try { 

        // Declare the constant variables.
        const agree = "✅";
        const disagree = "❎";
        // Multiply the time with 1000 because the message sender will enter SECONDS not MILISECONDS.
        const voteTime = parseInt(arguments[1], 10) * 1000;
        const voteArg = arguments.slice(2).join(' ');
        
        // If the time is a string or there are no time specified, stop.
        if (isNaN(voteTime)) return message.channel.send("Geçersiz zaman belirtildi.");

        // If there are no voting reason, stop.
        if (voteArg === "") return message.channel.send("Başlık belirtilmedi.");

        // Send the vote message.
        let msg = await message.channel.send(`Oylama: **${voteArg}**`);
        await msg.react(agree);
        await msg.react(disagree);

        // Await the reactions.
        const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {
            time: voteTime
        });

        // If there are no reactions, stop.
        if (reactions.get(agree) === undefined && reactions.get(disagree) === undefined) return message.reply("Hiç oy kaydedilmedi.");

        // the lines below looks like i used some duct tape to assemble the broken pieces, i'll get back to it when i find a better solution.
        // for some reason when users don't vote for "agree", it throws an error. but when people don't vote for "disagree", it works!
        let agreeCount;
        if (reactions.get(agree) === undefined) {
            agreeCount = 0;
        } else {
            agreeCount = reactions.get(agree).count - 1;
        }
        
        let disagreeCount;
        if (reactions.get(disagree) === undefined) {
            disagreeCount = 0;
        } else {
            disagreeCount = reactions.get(disagree).count - 1;
        }

        // Send the vote results.
        await message.reply(`**"${voteArg}**" oylaması sona erdi. \n**__Sonuçlar:__**\n\n${agree} : ${agreeCount}\n${disagree} : ${disagreeCount}`);
        // msg.delete();
    } catch (err) {
        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "``` <@!294910512783949825> ");
        console.error(err.stack);
    }
}

module.exports.help = {
    name: "vote"
}