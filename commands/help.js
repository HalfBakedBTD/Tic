const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let botEmbed = new Discord.RichEmbed()
  .setColor('#fff200')
  .setTitle("Bot Commands:")
  .setDescription("`,tics` - shows number of ticks you have.\n`,punish` - shows how users get punished.");
  message.channel.send(botEmbed)
}
	      
module.exports.help = {
  name: "help"
}
