const fetch = require('node-fetch')

module.exports = {
  name: 'insult',
  async execute(msg, args) {

    // Hit the insult API for a fresh insult
    fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Send the insult to the channel
      msg.channel.send(data.insult)
    })
    .catch(err => console.error(err))
  }
}
