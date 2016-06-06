var request = require('request')
request({
  method: 'POST',
  url: 'http://localhost:9090/api/users',
  json: true,
  body: {
    email: 'sinkerine@gmail.com',
    name: 'sinker'
  }
},
(err, res, body) => {
  console.log(body)
})
