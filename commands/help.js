module.exports = {
  name: 'help',
  execute(msg, args) {
    
    // Create a help message when someone types !help
    message = `Bitchbot help:
    To create a command type !addCommand commandName new command goes here
    To edit a command type !editCommand commandName new command goes here
    To delete a command type !deleteCommand commandName
    To execute a command just type !commandName`
    msg.channel.send(message)
  }
}