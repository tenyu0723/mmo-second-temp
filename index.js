const http = require('http')
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const prefix = "m/"
const target_ch_id = "回したいch"

http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
    response.end(`${client.user.tag} is ready!\n導入サーバー:${client.guilds.cache.size}\nユーザー:${client.users.cache.size}`)
  })
  .listen(3000)

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

client.on('ready', async () => {
  const you = client.users.cache.get("あなたのID")
    client.user.setActivity(`${client.user.username} | prefix=${prefix} | 製作者:${you.tag} | ${client.guilds.cache.size}servers | ${client.users.cache.size}members`, {
      type: 'PLAYING'
    });
  client.user.setStatus("idle");
  console.log(`${client.user.tag} is ready!`);
  client.channels.cache.get(target_ch_id).send("!!atk")
});

client.on("messageCreate", message => {
  const embed = message.embeds[0]
  if(message.author.id != "980429469875580939" || !embed || message.channel.id != target_ch_id){
    return;
  }
  if(embed.title && embed.title.match(/が待ち構えている...！/)){
    setTimeout(() => {
      message.channel.send("!!atk")
    },600)
  }
  if(embed.description && embed.description.match(/のHP/) && !embed.description.match(/はやられてしまった。。。/)){
    setTimeout(() => {
      message.channel.send("!!atk")
    },600)
  }
  if(embed.description && embed.description.match(/はやられてしまった。。。/)){
    setTimeout(() => {
      message.channel.send("!!i e")
    },600)
  }
  if(embed.description && embed.description.match(/はエリクサーを使った/)){
    setTimeout(() => {
      message.channel.send("!!atk")
    },600)
  }
});

client.login(process.env.DISCORD_BOT_TOKEN)
