const http = require('http')
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = new Client({
  partials: ["CHANNEL"],
  intents: new Intents(32767),
  restTimeOffset: -1000
});
const prefix = ""
const target_ch_id = "回したいch"
const your_id = "あなたのid"

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
  const you = client.users.cache.get(your_id)
    client.user.setActivity(`${client.user.username} | prefix=${prefix} | 製作者:${you.tag} | ${client.guilds.cache.size}servers | ${client.users.cache.size}members`, {
      type: 'PLAYING'
    });
  client.user.setStatus("idle");
  console.log(`${client.user.tag} is ready!`);
  client.channels.cache.get(target_ch_id).send("!!atk")
});

client.on("messageCreate", async message => {
  const embed = message.embeds[0]
  if(message.author.id != "980429469875580939" || !embed || message.channel.id != target_ch_id){
    return;
  }
  if(embed.title && embed.title.match(/が待ち構えている...！/)){
    setTimeout(() => {
      message.channel.send("!!atk")
    },750)
  }
  if(embed.description && embed.description.match(/のHP/) && !embed.description.match(/はやられてしまった。。。/)){
    setTimeout(() => {
      message.channel.send("!!atk")
    },750)
  }
  if(embed.description && embed.description.match(/はやられてしまった。。。/)){
    setTimeout(() => {
      message.channel.send("!!i e")
    },750)
  }
  if(embed.description && embed.description.match(/はエリクサーを使った/)){
    setTimeout(() => {
      message.channel.send("!!atk")
    },750)
  }
});

client.on("messageCreate", async message => {
  if(message.author.id != your_id){
    return;
  }
  const arg = message.content.slice(prefix.length).split(/ +/);
  const command = arg.shift().toLowerCase();
  if(command == "say"){
    const msg = message.content.slice(Number(prefix.length)+4).split();
    message.channel.send(msg)
  }
});

client.login(process.env.DISCORD_BOT_TOKEN)
