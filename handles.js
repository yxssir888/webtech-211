const url = require('url')
const qs = require('querystring')

const serverHandle = function (req, res) {
  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)

  console.log(`Path: ${path}, Params:`, params)

  res.writeHead(200, {'Content-Type': 'text/plain'})

  if (path === '/hello' && 'name' in params) {
    if (params['name'].toLowerCase() === 'yassir') {
      res.write('Hello Yassir! This is my personal introduction. I am learning Node.js!')
    } else {
      res.write('Hello ' + params['name'])
    }
  } else {
    res.write('Hello anonymous - go to /hello?name=YourName')
  }
  
  res.end()
}

module.exports = {
  serverHandle: serverHandle
}