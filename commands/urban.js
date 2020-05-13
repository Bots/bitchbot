const fetch = require('node-fetch')

module.exports = {
 name: 'urban',
 async execute(msg, args, discordCommand) {
  
   const hasNumber = /\d/.test(discordCommand)
   if(hasNumber) {

    // The command has a number, we need to strip it into a separate variable
    
    // Strip the number
    var num = discordCommand.match(/\d+/g)
    
   } else {
    // No number detected, set num[0] to zero
    var num = [1]
   }

  // take the remaining arguments (the query), beginning at zero, 
  // and join them with a %20
  const discordCommandArgs = args.slice(0).join('%20')

  // Fetch the data
  fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${discordCommandArgs}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY
    }
  })
    // Change the data to json 
    .then(response => response.json())

    // Get the first definition and delete any brackets in the response using a regex
    .then(res => res.list[num[0] - 1].definition.replace(/[[\]]/g,''))

    // Get the first definition and display it in the server
    .then(json => msg.channel.send(json))
    .catch(err => console.error(err)) 
  }
}