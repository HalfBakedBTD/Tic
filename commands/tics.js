const Discord = require("discord.js");
const tics = require("../tics.json");

exports.run = async (bot, message, args) => {
  let tCheck = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tCheck) {
    if(!tics[message.author.id]) {
      tics[message.author.id] = {
        tics: 0
      }
    }
    let uTicks = tics[message.author.id].tics;
    
    let ticEmbedU = new Discord.RichEmbed()
    .setColor('#d35400')
    .setTitle(`${message.author.username}:`)
    .setDescription(`Tics: ${uTicks}`);
    message.channel.send(ticEmbedU)
    return;
  }
  
}
	      
module.exports.help = {
  name: "tics"
}
