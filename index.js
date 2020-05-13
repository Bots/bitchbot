require('dotenv').config()
const Discord = require('discord.js')
const mongoose = require('mongoose')
const fs = require('fs')
const Command = require('./models/commandSchema')
const bot = new Discord.Client()
bot.commands = new Discord.Collection

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  bot.commands.set(command.name, command)
}

// get values from .env
const TOKEN = process.env.DISCORD_API_TOKEN
const connectionString = process.env.MONGODB_CONNECTION_STRING

// Assign the prefix for commands
const PREFIX = '!'

// Run the bot, log errors
run().catch(error => console.log(error.stack))

async function run() {
  
  // Login to Discord
  bot.login(TOKEN)

  // Connect to Atlas DB
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

  // Confirm db is logged in or throw connection error
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error.'))
  db.on('open', function() {
    console.log('Database connected')
  })

  // Confirm bot is logged in
  bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`)
  })

  // Read messages in channel
  bot.on('message', async msg => {
    
    // If msg doesn't start with ! or is sent by the bot itself, ignore it
    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return

    // We have a command! Slice slices off the !, trim makes sure there are not extra
    // spaces at the beginning or end, and split splits the args into an array
    const args = msg.content.slice(PREFIX.length).trim().split(/ +/g)

    // Shift pops the actual commmand off the array and returns it, leaving only the args,
    // then convert the command to lowercase
    let discordCommand = args.shift().toLowerCase()

    // Check if the command is urban or urban#
    if(checkForUrban(discordCommand, msg, args)) {
      return 
    }

    // See if there is a command file in the commands folder
    if(!bot.commands.has(discordCommand)) {
      try {
        // find our object according to the name of the command
        const cmd = await Command.findOne({commandName: discordCommand})
          
        // Check if the results are null (no command was found), if so reply "command not found"
        if(cmd === null) {
          msg.channel.send('Command not found.')
          return
        }

        // If this is a command from the database, reply with the command content
        if(discordCommand === cmd.commandName) {
          msg.channel.send(cmd.command)
          return
        }
      } catch (err) {
          console.log(err)
      }
    }

    try {
      bot.commands.get(discordCommand).execute(msg, args)
    } catch (error) {
      console.error(error)
      msg.reply('There was an error trying to execute that command.')
    }
  })
}

checkForUrban = function(discordCommand, msg, args) {
  
  // Check if command starts with urban or urban#
  if(discordCommand.startsWith('urban') || (discordCommand.startsWith('urban') && hasNumber(discordCommand))) {
    
    // Try to execute the urban command with the included arguments
    try {
      bot.commands.get('urban').execute(msg, args, discordCommand)
      return true
    } catch (error) {
      console.error(error)
      msg.reply('There was an error trying to execute that command.')
      return false
    }
  }

  function hasNumber(myString) {
    return /\d/.test(myString);
  }
}