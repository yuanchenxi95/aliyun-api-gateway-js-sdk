const { Client } = require('../dist')
const { appKey, appSecret } = require('./config')
const client = new Client(appKey, appSecret)

client.post({
  url: 'http://api.xdua.com/login'
})
  .then(res =>
    console.log(res)
  )
  .catch(err =>
    console.log(err)
  )