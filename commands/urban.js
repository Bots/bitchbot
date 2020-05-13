const fetch = require('node-fetch')

module.exports = {
 name: 'urban',
 async execute(msg, args, discordCommand) {
  
   const hasNumber = /\d/.test(discordCommand)
   
   // If the 'urban' has a number at the end 'urban2' for example
   if(hasNumber) {
    
    // Strip the number into a separate variable and put it an array at num[0]
    var num = [discordCommand.match(/\d+/g)]
    
   } else {
    // No number detected, set num[0] to one
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

    // Get the definition according to the value of num[0](minus one, to offset for 0 based arrays) 
    // and delete any brackets in the response using a regex (Urban Dictionary inserts weird brackets in the response)
    .then(res => res.list[num[0] - 1].definition.replace(/[[\]]/g,''))

    // Get the definition and display it in the server
    .then(json => msg.channel.send(json))
    .catch(err => console.error(err)) 
  }
}