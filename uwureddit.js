const Discord = require("discord.js")
const client = new Discord.Client()
const randomPuppy = require("random-puppy")
const config = require("./config.json")
const prefix = "give me a meme"

client.on("ready", () => {
    console.log("sending uwu")
})

const commands = {
    "": function (message, arg) {
        const subReddits = ["memes", "dankmemes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
        randomPuppy(random).then((img) => {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setColor("Green")
                    .setImage(img)
                    .setTitle(`memes - ${random}`)
                    .setURL(`https://reddit.com/r/${random}`)
                    .setTimestamp()
            )
        })
    },
    help: function (message, arg) {
        message.reply("help" + arg)
    }
}

client.on("message", (message) => {
    if (message.author.bot === true) return
    if (!message.content.startsWith(prefix)) return
    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    console.log(commands.hasOwnProperty(command))
    if (command in commands) {
        commands[command](message, args)
    }
})

client.login(config.token)