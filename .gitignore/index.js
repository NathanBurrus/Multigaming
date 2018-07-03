const Discord = require("discord.js");

const client = new Discord.Client();

var prefix = "/";

client.login("NDYxNDM1MzAxODAyNTQxMDc4.DhgQuA.Ch1ebEYEpJwrlomAMzuEpAn3qyE");

client.on("ready", () => {
    console.log("bot ready")
    client.user.setGame("Besion d'aide ? /aide");
});

client.on('message', message => {

    if(message.content === prefix + "cmdsadmin"){
        var admin_embed = new Discord.RichEmbed()
        .setColor("#660033")
        .setTitle("commandes modération")
        .setDescription("Admin cmds!")
        .addField("/ban", "@pseudo")
        .addField("/kick", "@pseudo")   
        .addField("/mute", "@pseudo")
        .addField("/unmute", "@pseudo (Obligatoirement un personne mute)")
        .addField("/warn", "@pseudo")
        .addField("/chanellist", "afichera le nombre de canaux et de catégorie")
        .setFooter("MultiGaming - Panel-Admin ")
        message.channel.sendMessage(admin_embed);
        console.log("admin menu send !") 
    }

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "pstats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        
        .setColor("#660033")
        .setTitle(`Statistiques utilisateur : ${message.author.username}`)
        .addField(`Client Id :id:`, msgauthor, true)
        .addField("Création en :", userCreateDate[1] + ' ' + userCreateDate[2] + ' '+ userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Le message avec tes informations vient de t'étre envoyer en priver !")
        .setFooter("MultiGaming - Public")
        message.author.send({embed: stats_embed});
        console.log("stats user sens in private")
        break
    }
    if(message.content === prefix + "infos"){
        var infos_embed = new Discord.RichEmbed()
        .setColor("#660033")
        .setTitle("Infos")
        .setDescription("Information sur le dévelopeur et le serveur !")
        .addField(" :robot: ", `${client.user.tag}`, true)
        .addField("Id :id:", `${client.user.id}`)   
        .addField("Membres total", message.guild.members.size)
        .addField("Catégorie et Salon", message.guild.channels.size)
        .setFooter("MultiGaming - Public")
        message.channel.sendMessage(infos_embed);
        console.log("infos menu send succefuly !") 
    } 

    if(message.content === prefix + "adminstats"){
        var adminstats_embed = new Discord.RichEmbed()
        .setColor("#660033")
        .setTitle("Infos")
        .setDescription("Information sur le dévelopeur et le serveur !")
        .addField(" :robot: ", `${client.user.tag}`, true) 
        .addField("Membres total", message.guild.members.size)
        .addField("Catégorie et Salon", message.guild.channels.size)
        .setFooter("MultiGaming - Panel-Admin !")
        message.channel.sendMessage(adminstats_embed);
        console.log("infos menu send succefuly !") 
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Précise un numéro de message a suprimer!")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} message on été effacer avec succés !`);
            console.log("des msg on été clear")
        })
    }


    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission !");
        if(message.mentions.users.size === 0) {
            return message.channel.send("Format invalide, vérifier que vous avez bien mentioner un membres !")
        }
        var kick = message.guild.member(message.mentions.users.first())
        if(!kick) {
            return message.channel.send("Es-ce-que cette utilisateur existe ??")
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission !")
        }
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} a été kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission !");
        if(message.mentions.users.size === 0) {
            return message.channel.send("Format invalide, vérifier que vous avez bien mentioner un membres !")
        }
        var ban = message.guild.member(message.mentions.users.first())
        if(!ban) {
            return message.channel.send("Es-ce-que cette utilisateur existe ??")
        }
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission !")
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} a été banni par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute par ${message.author.username} !`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} est un-mute par ${message.author.username} !`);
        })
    }

});