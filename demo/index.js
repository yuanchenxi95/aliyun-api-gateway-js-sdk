const { Client } = require('../index')
const { appKey, appSecret } = require('./config')
const client = new Client(appKey, appSecret)

client.post({
  url: 'http://api.xdua.com/login?hi=bob&ha=zhangzhe',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  data: {
    'hello': 'world'
  }
})
  .then(res =>
    console.log(res)
  )
  .catch(err =>
    console.log(err)
  )
