const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let botEmbed = new Discord.RichEmbed()
  .setColor('#fff200')
  .setDescription("*coming soon...*");
  message.channel.send(botEmbed)
}
	      
module.exports.help = {
  name: "help"
}
