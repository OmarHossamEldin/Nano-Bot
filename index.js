const Discord = require('discord.js');
const Jimp    = require("jimp");
const YTDL    =	require("ytdl-core");
const fs      = require('fs');
const TOKEN   ="ODEyMzE2NDM2MzQ5MzIxMjI2.YC--og.L-WkYiCe5EPK5538foYuUulYbuI";
const PREFIX  ="=>";
const bot     = new Discord.Client();

function play(connection,message){
    var server =servers[message.guild.id];

    server.dispatcher =connection.playStream(YTDL(server.queue[0],{filter:"audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end",function(){
        if(server.queue[0])play(connection,message);
        else connection.disconnect();
    });
} 
var servers ={};

bot.on('ready', () => {  
    console.log(`bot is ready`);
    console.log(`Logged in as ${bot.user.tag}`);
    console.log(`From server ${bot.guilds.first(1)}`);
    console.log(`the number of channels is ${bot.channels.size}`);
    console.log(`With ${bot.users.size} of users`); 
    bot.user.setActivity(PREFIX+'help', { type: 'LISTENING' });
  });

// welcome , good bye messages . and picking roles 
bot.on("guildMemberAdd",function(member)
{
    // url of member  avater =>member.user.avatarURL
    // number of =>member.guild.memberCount
    // username of =>member.user.tag
    // name of guild =>member.guild.name
    var images  =[member.user.displayAvatarURL,'background.jpg','border.jpg'];
    var jimps   =[];
    for(var i=0;i<images.length; i++){
        jimps.push(Jimp.read(images[i]));
    }
    Promise.all(jimps).then(function(data){
        return Promise.all(jimps);
    }).then(function(data){
        data[0].resize(500,500);
        data[1].composite( data[2], 80, 175);
        data[1].composite( data[0], 98, 190);
            Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then(function (font) {
            data[1].print(font, 1141, 175, "Welcome");
            data[1].print(font, 850, 387, member.user.tag);
            data[1].print(font, 1141, 587, member.guild.memberCount+"th user");
            data[1].write("welcome_post.jpg");
            member.guild.channels.find("name","welcome").send("Welcome to :space_invader::heart: "+member.guild.name.toString()+","+member.toString()+"! You  are the "+member.guild.memberCount+"th user :tada:");
		    member.guild.channels.find("name","welcome").send(member.toString()+" Please check the "+member.guild.channels.find("name","rules").toString()+" channel and use "+member.guild.channels.find("name","bot-spam").toString()+" channel for bot commands using [=>help]");
		    member.addRole(member.guild.roles.find("name","league of leagends"));
		    member.guild.channels.find("name","covers").sendFile('welcome_post.jpg','welcome_post.jpg');
            });   
    });
        
});

bot.on("guildMemberRemove",function(member)
{
    member.guild.channels.find("name","welcome").send("**"+member.toString()+"** it takes forever to say goodbye , **False**. it takes exactly .978 secounds to say goodbye.");
});

//commands to do 

bot.on("message",function(message)
{
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(PREFIX))return;
    var full_command=[];
    var args =message.content.substring(PREFIX.length).split(" ");
    full_command.push(message.content.substring(args[0].length+PREFIX.length));

    switch(args[0].toLowerCase()){
        case "help":
            var help =new Discord.RichEmbed()
            .setColor(4886754)
            .setTitle("Basic Commands")
            .addField("play <url of any song>","to play songs form youtube and add new spngs to the queue")
            .addField("skip","to skip the current song")
            .addField("pause","to pause the current song")
            .addField("resume","to resume the current song")
            .addField("leave","to leave the channel")
            .addField("Ranks","To see the available Ranks")
            .setFooter("Available Commands");
            message.channel.send(help);
            break;
        case "joke":
        if(!args[1]&!args[2]){
                message.channel.send("```Please mention someone followed by a space and the reason,message etc```")
                return;
            }
            // user -> to make sure the is one mentioned
            var user=args[1].search("@");
            if(user==-1){
                message.channel.send(""+message.author+" Please mention someone to report");
                return;
            }
            if(user!=-1&&args[2]!=null){
            	//if(typeof args[3] == 'undefined')return message.channel.send(""+message.author+",Please write anything to send");
                var idm = args[1].replace(/[^\d]/g, ''); // to get the id of th mentioned noe
                if(idm==367824557848920074)return message.channel.send(""+message.author+", I can't message myself");
                let members = message.guild.members;     // get all members of the guild
                let guildMember = members.find('id',idm);// get the mentioned one
                if(guildMember==null) return message.channel.send(""+message.author+" User not found to report");   // in case the member not found
                var photos  =[guildMember.user.displayAvatarURL,'banner.png'];
			    var pics   =[];
			    var commant	=[];
			    commant.push(message.content.substring(args[1].length+args[0].length+PREFIX.length+1));
			    for(var s=0;s<photos.length; s++){
			        pics.push(Jimp.read(photos[s]));
			    }
			    Promise.all(pics).then(function(data){
			        return Promise.all(pics);
			    }).then(function(data){
			    	data[0].resize(500,500);
			        data[0].composite(data[1], 0,0);
			            Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function (font) {
			            data[0].print(font, 0, 16, commant.toString());
			            data[0].write("test.jpg");
					    message.channel.send(commant.toString(),{files:["test.jpg"]});
			            });   
			    });
                return;
            }
        	break;  	     
        case "ranks":
            var ranks=new Discord.RichEmbed();
            ranks.setTitle("Ranks of league of leagends");
            ranks.setColor(15952391);
            ranks.setDescription("Unranked rank   <=>    Type The Prefix (=>) Then Unranked"+"\n"+
            "Bronze rank        <=>    Type The Prefix (=>) Then Bronze"+"\n"+
            "Silver rank           <=>    Type The Prefix (=>) Then Silver"+"\n"+
            "Gold rank            <=>    Type The Prefix (=>) Then Gold"+"\n"+
            "Platinum rank     <=>    Type The Prefix (=>) Then Platinum"+"\n"+
            "Diamond rank    <=>    Type The Prefix (=>) Then Diamond"+"\n"+
            "Master rank        <=>    Type The Prefix (=>) Then Master"+"\n"+
            "Challenger rank  <=>    Type The Prefix (=>) Then Challenger");
            ranks.setFooter("Available Ranks");
            message.channel.send(ranks);
            break;
        case "unranked":
            let Unranked=message.member.guild.roles.find("name","Unranked");
            if(message.member.roles.has(Unranked.id)){
                message.member.removeRole(message.member.guild.roles.find("name","Unranked"));
                message.channel.send("you have been removed from **Unranked Rank**");
                return;
            }
            if(!message.member.roles.has(Unranked.id)){
                message.member.addRole(message.member.guild.roles.find("name","Unranked"));
                message.channel.send("you have been added to **Unranked Rank**");
                return;
            }
            break;        
        case "bronze":
            let Bronze=message.member.guild.roles.find("name","Bronze");
            if(message.member.roles.has(Bronze.id)){
                message.member.removeRole(message.member.guild.roles.find("name","Bronze"));
                message.channel.send("you have been removed from **Bronze Rank**");
                return;
            }
            if(!message.member.roles.has(Bronze.id)){
                message.member.addRole(message.member.guild.roles.find("name","Bronze"));
                message.channel.send("you have been added to **Bronze Rank**");
                return;
            }
            break;    
        case "silver":
            let Silver=message.member.guild.roles.find("name","Silver");
            if(message.member.roles.has(Silver.id)){
                message.member.removeRole(message.member.guild.roles.find("name","Silver"));
                message.channel.send("you have been removed from **Silver Rank**");
                return;
            }
            if(!message.member.roles.has(Silver.id)){
                message.member.addRole(message.member.guild.roles.find("name","Silver"));
                message.channel.send("you have been added to **Silver Rank**");
                return;
            }
            break;
        case "gold":
            let Gold=message.member.guild.roles.find("name","Gold");
            if(message.member.roles.has(Gold.id)){
                message.member.removeRole(message.member.guild.roles.find("name","Gold"));
                message.channel.send("you have been removed from **Gold Rank**");
                return;
            }
            if(!message.member.roles.has(Gold.id)){
                message.member.addRole(message.member.guild.roles.find("name","Gold"));
                message.channel.send("you have been added to **Gold Rank**");
                return;
            }
            break;
        case "platinum":
            let Platinum=message.member.guild.roles.find("name","Platinum");
            if(message.member.roles.has(Platinum.id)){
                message.member.removeRole(message.member.guild.roles.find("name","Platinum"));
                message.channel.send("you have been removed from **Platinum Rank**");
                return;
            }
            if(!message.member.roles.has(Platinum.id)){
                message.member.addRole(message.member.guild.roles.find("name","Platinum"));
                message.channel.send("you have been added to **Platinum Rank**");
                return;
            }
            break;
        case "diamond":
            let Diamond=message.member.guild.roles.find("name","Diamond");
            if(message.member.roles.has(Diamond.id)){
                message.member.removeRole(message.member.guild.roles.find("name","Diamond"));
                message.channel.send("you have been removed from **Diamond Rank**");
                return;
            }
            if(!message.member.roles.has(Diamond.id)){
                message.member.addRole(message.member.guild.roles.find("name","Diamond"));
                message.channel.send("you have been added to **Diamond Rank**");
                return;
            }
            break;
        case "master":
            let Master=message.member.guild.roles.find("name","Master");
            if(message.member.roles.has(Master.id)){
                message.member.removeRole(message.member.guild.roles.find("name","Master"));
                message.channel.send("you have been removed from **Master Rank**");
                return;
            }
            if(!message.member.roles.has(Master.id)){
                message.member.addRole(message.member.guild.roles.find("name","Master"));
                message.channel.send("you have been added to **Master Rank**");
                return;
            }
            break;
        case "challenger":
            let Challenger=message.member.guild.roles.find("name","Challenger");
            if(message.member.roles.has(Challenger.id)){
                message.member.removeRole(message.member.guild.roles.find("name","Challenger"));
                message.channel.send("you have been removed from **Challenger Rank**");
                return;
            }
            if(!message.member.roles.has(Challenger.id)){
                message.member.addRole(message.member.guild.roles.find("name","Challenger"));
                message.channel.send("you have been added to **Challenger Rank**");
                return;
            }
            break;                        
        case "play":
            if(!args[1]){
                message.channel.send("please insert a link")
                return;
            }
            if(!message.member.voiceChannel){
                message.channel.send("you must be in voice channel")
                return;
            }
            if(!servers[message.guild.id])servers[message.guild.id]={
                queue:[]
            };
            var server =servers[message.guild.id];
            server.queue.push(args[1]);
            if(!message.guild.voiceConnection)message.member.voiceChannel.join().then(function(connection){
                message.channel.send("the song has been added to the queue"+message.member.toString());
                play(connection,message);
            });
            break;
        case "pause":
            var server =servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.pause();
            message.channel.send("the song has been paused to the queue"+message.member.toString());
            break;
        case "resume":
            var server =servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.resume();
            message.channel.send("the song has been resumed to the queue"+message.member.toString());
            break;        
        case "skip":
            var server =servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send("the song has been skipped to the queue"+message.member.toString());
            break;
        case "leave":
            var server =servers[message.guild.id];
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.send("I left the channel"+message.member.toString());
            break;     
        case "leave_gu":
            message.guild.leave();
            break;    
        default:
            var error= ["**Someone Touch My Spaghet!?**","**Do You Know the Way!**"+message.guild.emojis.find("name", "AniKnuckles")+"","**WROOG**","**Wanna Come Back To My Crib?**"];
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            message.channel.send(error[getRandomInt(4)]);   
    }
});

bot.login(TOKEN);
