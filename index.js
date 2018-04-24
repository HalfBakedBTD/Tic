const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const tics = require("./tics.json");
const lmessages = require("./lmessages.json");
const muteLvl = require("./muteslevel.json");
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
  
  if(!lmessages[message.author.id]) {
    lmessages[message.author.id] = {
      one: `${message.content}`,
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      nine: "",
      ten: ""
    }
  } else {
    lmessages[message.author.id].ten = lmessages[message.author.id].nine
    lmessages[message.author.id].nine = lmessages[message.author.id].eight
    lmessages[message.author.id].eight = lmessages[message.author.id].seven
    lmessages[message.author.id].seven = lmessages[message.author.id].six
    lmessages[message.author.id].six = lmessages[message.author.id].five
    lmessages[message.author.id].five = lmessages[message.author.id].four
    lmessages[message.author.id].four = lmessages[message.author.id].three
    lmessages[message.author.id].three = lmessages[message.author.id].two
    lmessages[message.author.id].two = lmessages[message.author.id].one
    lmessages[message.author.id].one = message.content
  }
  
  if (tics[message.author.id].tics > 4) {
    if(!muteLvl[message.author.id]) {
      muteLvl[message.author.id] = {
        mutes: 0
      }
    }
    let pMute = message.member;
    if (muteLvl[message.author.id].mutes < 1) {
      muteLvl[message.author.id].mutes = muteLvl[message.author.id].mutes + 1
  
      let muterole = message.guild.roles.find(`name`, "tic mute");
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "tic mute",
            color: "#000000",
            permissions:[]
          })
            message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
      let mutetime = "10m";

      await(pMute.addRole(muterole.id));
      message.author.send(`You have just hit five tics! You are now muted for **10 minutes**.`);  

      setTimeout(function(){
        pMute.removeRole(muterole.id);
        message.author.send(`You have been unmuted! You can now chat in **${message.guild.name}**!`);
      }, ms(mutetime));
    }
  }
  
  if (!message.content.startsWith(',')) {
    if (lmessages[message.author.id].one === lmessages[message.author.id].two) {
      message.delete().catch(O_o=>{}); 
      if (lmessages[message.author.id].two === lmessages[message.author.id].three) {
        if (lmessages[message.author.id].three === lmessages[message.author.id].four) {
          if (lmessages[message.author.id].four === lmessages[message.author.id].five) {
            if (lmessages[message.author.id].five === lmessages[message.author.id].six) {
              if (lmessages[message.author.id].six === lmessages[message.author.id].seven) {
                if (lmessages[message.author.id].seven === lmessages[message.author.id].eight) {
                  if (lmessages[message.author.id].eight === lmessages[message.author.id].nine) {
                    if (lmessages[message.author.id].nine === lmessages[message.author.id].ten) {
                      tics[message.author.id].tics = tics[message.author.id].tics +25
                      message.reply(`you have just repeated himself nine times! [tic +25]`).then(msg => msg.delete(5000));
                      return;
                    }
                    tics[message.author.id].tics = tics[message.author.id].tics +10
                    message.reply(`you have just repeated yourself eight times! [tic +10]`).then(msg => msg.delete(5000));
                    return;
                  }
                  tics[message.author.id].tics = tics[message.author.id].tics +7.5
                  message.reply(`you have just repeated yourself seven times! [tic +7.5]`).then(msg => msg.delete(5000));
                  return;
                }
                tics[message.author.id].tics = tics[message.author.id].tics +4
                message.reply(`you have just repeated yourself six times! [tic +4]`).then(msg => msg.delete(5000));
                return;
              }
              tics[message.author.id].tics = tics[message.author.id].tics +2.5
              message.reply(`you have just repeated yourself five times! [tic +2.5]`).then(msg => msg.delete(5000));
              return;
            }
            tics[message.author.id].tics = tics[message.author.id].tics +1
            message.reply(`you have just repeated yourself four times! [tic +1]`).then(msg => msg.delete(5000));
            return;
          }
          tics[message.author.id].tics = tics[message.author.id].tics +0.75
          message.reply(`you have just repeated yourself three times! [tic +0.75]`).then(msg => msg.delete(5000));
          return;
        }
        tics[message.author.id].tics = tics[message.author.id].tics +0.5
        message.reply(`you have just repeated yourself two times! [tic +0.5]`).then(msg => msg.delete(5000));
        return;
      }
      tics[message.author.id].tics = tics[message.author.id].tics + 0.25
      message.reply(`you have just repeated yourself! [tic +0.25]`).then(msg => msg.delete(5000));
      return;
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
