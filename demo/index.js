const { Client } = require('../index')
const { appKey, appSecret } = require('./config')
const client = new Client(appKey, appSecret)

client.post({
  url: 'https://ocrapi-document.taobao.com/ocrservice/document?hi=bob',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  params: {
    'hello': 'world',
    'dsn': '+h&&&+++&&&e',
    'empty': '',
    // 'emptyArray': [1, 2]
  },
  data: {
    z: '+h&sdf&&+sdf++&&&e',
    url: 'http://res.cloudinary.com/dw5ab4upj/image/upload/v1530152481/0_3_rzc5nm.jpg',
  }
})
  .then(res =>
    console.log(res)
  )
  .catch(err =>
    console.log(err)
  )
