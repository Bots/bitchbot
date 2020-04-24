const mongoose = require('mongoose')
const Command = require('../models/commandSchema')

module.exports = {
  name: 'addcommand',
  async execute(msg, args) {

  // This pops the next arg off the array (the command name to be created) and makes it lowercase
  const discordCommandName = args.shift().toLowerCase()

    // If not, take the remaining arguments (the actual command to be created), beginning at zero, 
    // and join them into a sentence
    const discordCommandArgs = args.slice(0).join(' ');

    // Log our variables, delete for production
    //console.log(`${discordCommand}, ${discordCommandName}, ${discordCommandArgs}`)

    // Now that we have our 3 parts, create a new command
    const newDiscordCommand = new Command({
      _id: mongoose.Types.ObjectId(),
      commandName: discordCommandName,
      command: discordCommandArgs
    })

    // Save the newly created command to the db
    newDiscordCommand.save(function (err, newDiscordCommand) {
      if (!err) {
        msg.channel.send(`Command ${newDiscordCommand.commandName} was created.`)
      } else if (err.name === 'MongoError' && err.code === 11000) {
        msg.channel.send(`Command ${discordCommandName} already exists.`)
      } else {
        msg.channel.send(`Error creating command.`)
      }
    })
  }
}