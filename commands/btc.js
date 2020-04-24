const btcValue = require('btc-value')

module.exports = {
  name: 'btc',
  async execute(msg, args) {

    btcValue.setApiKey(process.env.BTC_VALUE_API_KEY)
    let percentage = ''

    try {
      await btcValue.getPercentageChangeLastDay().then(percent => {
        percentage = Math.trunc(percent)
      })
    } catch(err) {
      console.error(err)
    }

    try {
      await btcValue().then(value => {
        msg.channel.send(`Current bitcoin value is $${value}, there has been a ${percentage}% change in the last day.`)
      })
    } catch(err) {
      console.error(err)
    }
  }
}