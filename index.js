const Discord = require('discord.js')
const mongoose = require('mongoose')
const Command = require('./models/commandSchema')
const bot = new Discord.Client()

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
  mongoose.connect(connectionString, {useNewUrlParser: true})

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
    const discordCommand = args.shift().toLowerCase()
    
    // Begin commands 
    switch(discordCommand) {

      case 'addcommand': {

        // This pops the next arg off the array (the command name to be created) and makes it lowercase
        const discordCommandName = args.shift().toLowerCase()

        // Take the remaining arguments (the actual command to be created), beginning at zero, 
        // and join them into a sentence
        const discordCommandArgs = args.slice(0).join(' ');

        // Log our variables, delete for production
        console.log(`${discordCommand}, ${discordCommandName}, ${discordCommandArgs}`)

        // Now that we have our 3 parts, create a new command
        const newDiscordCommand = new Command({
          _id: mongoose.Types.ObjectId(),
          commandName: discordCommandName,
          command: discordCommandArgs
        })

        // Save the newly created command to the db
        newDiscordCommand.save(function (err, newDiscordCommand) {
          if (err) return console.error(err)
          console.log(`New command ${discordCommandName} created.`)
          console.log(newDiscordCommand)
          msg.channel.send(`Command ${discordCommandName} has been created.`)
        })
        break
      }
      case 'deletecommand': {

        // This pops the next arg off the array (the command name to be deleted) and makes it lowercase
        const discordCommandName = args.shift().toLowerCase()
        
        try {
          // Find our object according to the name of the command
          var cmd = await Command.findOne({commandName: discordCommandName})

          // Delete the document and reply that it has been deleted
          Command.findByIdAndDelete(cmd._id, (err,todo) => {
            if(err) return console.error(err)
            msg.channel.send(`Command ${discordCommandName} has been deleted.`)
          })
        } catch (err) {
          console.log(err)
        }
        break
      } 
      
      case 'editcommand': {
        
        // This pops the next arg off the array (the command name to be edited) and makes it lowercase
        const discordCommandName = args.shift().toLowerCase()

        // Take the remaining arguments (the actual command to replace the original), beginning at zero, 
        // and join them into a sentence
        const discordCommandArgs = args.slice(0).join(' ');
        
        try {
          // Find our object according to the name of the command
          var cmd = await Command.findOne({commandName: discordCommandName})

          // Now that we have our 3 parts, create an updated command
          const newDiscordCommand = {
            _id: cmd._id,
            commandName: discordCommandName,
            command: discordCommandArgs
          }

          // Edit the newly created command to the db
          Command.findByIdAndUpdate(cmd._id, newDiscordCommand, {new: true}, function(err,model) {
            if(err) return console.error(err)
            msg.channel.send(`Command ${discordCommandName} has been edited.`)
          })

        } catch (err) {
          console.error(err)
        }  
        break
      }

      case 'help': {

        // Create a help message when someone types !help
        message = `Bitchbot help:
        To create a command type !addCommand commandName new command goes here
        To edit a command type !editCommand commandName new command goes here
        To delete a command type !deleteCommand commandName
        To execute a command just type !commandName`
        msg.channel.send(message)
        break
      }
      
      // If not a hard-coded command, check if command is in the database
      default: {
        try {
        // find our object according to the name of the command
          const cmd = await Command.findOne({commandName: discordCommand})
          
          // Check if the results are null, if so reply "command not found"
          if(cmd === null) {
            msg.channel.send('Command not found')
          }

          // If this is a command from the database, reply with the command content
          if(discordCommand === cmd.commandName) {
            msg.channel.send(cmd.command)
          }
        } catch (err) {
          console.log(err)
        }
        break
      }
    }
  })
}