module.exports.run = async (client, message, args, arguments) => {

    // using try/catch because why not
    try {
        
        // Set variables
        let nameNum = args[0];
        let names = arguments.slice(2);
        let pickedNames = [];

        // If the first argument isn't a number, stop.
        if(isNaN(nameNum)) return message.channel.send("Seçim sayısı belirtilmedi. Kullanım:\n**..pick {sayı} {arg1} {arg2} ... {argn}**");
        // If nameNum is bigger than the names provided, stop.
        if(nameNum > names.length) return message.channel.send("Seçim sayısı verilen argümanlardan daha fazla olamaz.");

        // For every name selected, add the names inta an array
        for (let index = 0; index < nameNum; index++) {
            let pickedName = Math.floor(Math.random() * names.length);
            var pickedNames1 = names[pickedName];
            pickedNames.push(` ${pickedNames1}`);

            // Also remove the space on the first index
            if (pickedNames[0] === ` ${pickedNames1}`) {
                pickedNames[0] = pickedNames[0].substring(1);
            };
            
            // Do not select the same name again
            names.splice(pickedName, 1);
        };


        message.channel.send(`${nameNum} argüman seçildi:\n**${pickedNames}**`);

    } catch (err) {

        message.channel.send("Bir hata meydana geldi: ```javascript\n" + err + "``` <@!294910512783949825> ");
        console.error(err.stack);
        
    }
}

module.exports.help = {
    name: "pick"
}