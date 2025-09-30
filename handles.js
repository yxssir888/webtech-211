const url = require('url')
const qs = require('querystring')
const fs = require('fs')
const pathModule = require('path')

module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const pathname = route.pathname
    const params = qs.parse(route.query)

    // Route: /
    if (pathname === '/') {
      const html = `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Home</title></head>
          <body>
            <h1>Welcome</h1>
            <p>Try <a href="/hello?name=Adja">/hello?name=Adja</a></p>
            <p>Or <a href="/about">/about</a></p>
          </body>
        </html>
      `
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(html)
      return
    }

    // Route: /hello
    if (pathname === '/hello') {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      if (params.name === 'Adja') {
        res.end('Hello Adja! You are a thoughtful and methodical learner passionate about ethical tech.')
      } else if (params.name) {
        res.end('Hello ' + params.name)
      } else {
        res.end('Hello anonymous')
      }
      return
    }

    // Route: /about
    if (pathname === '/about') {
      try {
        const about = require('./content/about.json')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(about, null, 2))
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Error loading about.json')
      }
      return
    }

    // Dynamic route: /content/filename
    const contentPath = pathModule.join(__dirname, 'content', pathname.replace('/', '') + '.json')
    if (fs.existsSync(contentPath)) {
      const fileContent = fs.readFileSync(contentPath)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(fileContent)
      return
    }

    // Route not found
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
}
