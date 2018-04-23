const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const tics = require("./tics.json");
const ms = require("ms");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setGame(`with ${bot.guilds.size} servers. | ,help.`);
});

bot.on('guildMemberAdd', async member => {
  let tomute = member;
  
  let muterole = member.guild.roles.find(`name`, "tic mute");
  if(!muterole){
    try{
      muterole = await member.guild.createRole({
        name: "tic mute",
        color: "#000000",
        permissions:[]
      })
      member.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = "15m";

  await(tomute.addRole(muterole.id));
  member.send(`To prevent raiding, you have been auto muted and therefore cannot chat in **${member.guild.name}** for 15 minutes. Once the mute is over, I will message you again letting you know that you can chat!`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    member.send(`You have been unmuted! You can now chat in **${member.guild.name}**!`);
  }, ms(mutetime));
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: ','
    };
  }
  
  if(!tics[message.author.id]) {
    tics[message.author.id] = {
      tics: 0
    }
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (!message.content.startsWith(`${prefix}`)) {
    return;
  }  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  
});

bot.login(process.env.BOT_TOKEN);
