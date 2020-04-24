const btcValue = require('btc-value')

module.exports = {
  name: 'btc',
  execute(msg, args) {

    btcValue.setApiKey(process.env.BTC_VALUE_API_KEY)

    btcValue().then(value => {
      msg.channel.send(`Current bitcoin value is $${value}`)
    })
  }
}