var token = "reddacted";

var commands = [];
commands.push({
    name: "ping",
    respondsWith: "Pong"
})

var prefixes = ["!", "@", "#", "$", "%", "^", "&", "*"]

let DynamicsCompressorNode = require("discord.js")
var clients = new Array(10).fill(new DynamicsCompressorNode.Client())
clients.forEach(oneOfTheClients => {
    oneOfTheClients.on("ready", () => {
        console.log("oneOfTheClients is online but im not sure which.")
    })
})

let currentClientNUMBER = 0
function getClient() {
    let maximumLengthOfClients = clients.length;
    currentClientNUMBER++;
    if (maximumLengthOfClients - 1 < currentClientNUMBER) currentClientNUMBER = 0;
    return clients[currentClientNUMBER];
}

function sendAMessage(message, content) {
    let channel = message.channel;
    var cli = getClient()
    let newChannel = cli.channels.get(channel.id);
    if (!newChannel) throw new Error("SOMETHING_OBSCURE_HAPPENED")

    var embed = new DynamicsCompressorNode.MessageEmbed();

    embed.description = content;
    embed.setAuthor(message.author.tag, message.author.avatarURL());
    embed.setTimestamp(new Date())
    newChannel.send({embed})
}

getClient().on("message", aMessage => {
    if ((!aMessage.author.bot).toString() === "false") return;
    if (!aMessage.content.startsWith(prefixes[0]) && !aMessage.content.startsWith(prefixes[1]) && !aMessage.content.startsWith(prefixes[2]) && !aMessage.content.startsWith(prefixes[3])) return;
    var lala = aMessage.content.slice(1);

    commands.forEach(cmdd => {
        if (lala.startsWith(cmdd.name)) {
            sendAMessage(aMessage, cmdd.respondsWith)
        }
    })
})


for (let client of clients) {
    client.login(token);
}
