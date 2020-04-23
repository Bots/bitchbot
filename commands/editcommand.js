module.exports = {
  name: 'editcommand',
  execute(msg, args) {

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
          Command.findByIdAndUpdate(cmd._id, newDiscordCommand, {new: true}, function(err) {
            if(err) return console.error(err)
            msg.channel.send(`Command ${discordCommandName} has been edited.`)
          })

        } catch (err) {
          console.error(err)
        }  
  }
}