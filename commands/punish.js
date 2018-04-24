const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let botEmbed = new Discord.RichEmbed()
  .setColor('#fff200')
  .setTitle("Punishment System:")
  .setDescription("\t-5 tics: 15 minute mute.\n\t-10 tics: 30 minute mute.\n\t-15 tics: 1 hour mute.\n\t-20 tics: 2 hour mute.\n\t-25 tics: 4 hour mute.\n\t-32 tics: 8 hour mute.\n\t-40 tics: mute until bot restart. (Up to 24h)\n\t-50 tics: perm mute.");
  message.channel.send(botEmbed)
}
	      
module.exports.help = {
  name: "punish"
}
