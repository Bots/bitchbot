const fetch = require('node-fetch')

module.exports = {
  name: 'btc',
  async execute(msg, args) {
    const cmcApiKey = process.env.CMC_PRO_API_KEY

    fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&CMC_PRO_API_KEY=${cmcApiKey}`)
    .then(resp => resp.json())
    .then(data => {
      msg.channel.send(`Current Bitcoin price is $${Math.trunc(data.data.BTC.quote.USD.price)}, There has been a ${Math.trunc(data.data.BTC.quote.USD.percent_change_1h)}% change in the last hour, A ${Math.trunc(data.data.BTC.quote.USD.percent_change_24h)}% change in the last 24 hours, and a ${Math.trunc(data.data.BTC.quote.USD.percent_change_7d)}% change in the last week.`)
    })
  }
}