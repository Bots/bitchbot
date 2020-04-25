const fetch = require('node-fetch')

module.exports = {
 name: 'urban',
 async execute(msg, args) {
  
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
    // Get the first definition and display it in the server
    .then(json => msg.channel.send(json.list[0].definition))
    .catch(err => console.error(err)) 
  }
}