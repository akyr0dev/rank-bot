const { Client, GatewayIntentBits } = require('discord.js');
const { token, roleId, keyword } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.once('ready', () => {
  console.log('----------------------------')
  console.log('BOT MADE BY B2B TEAM')
  console.log(`${client.user.tag} est connecter.`);
  console.log('----------------------------')
});

client.on('messageCreate', async message => {
  if (message.mentions.has(client.user) && !message.author.bot) {
    const member = message.guild.members.cache.get(message.author.id);

    if (member.displayName.includes(keyword)) {
      const role = message.guild.roles.cache.get(roleId);

      if (role) {
        await member.roles.add(role);
        message.channel.send(`✅ Le rôle a bien était assigné à **${member.displayName}**`);
      } else {
        message.channel.send(`:x: Rôle introuvable ( ${roleId} )`);
      }
    } else {
      message.channel.send(`:x: Vous n'avez pas **${keyword}** dans votre pseudo.`);
    }
  }
});

client.login(token);