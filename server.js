const app = require('./index')
const fs = require('fs')
const http = require('http')
const https = require('https')

const options = {
  key: fs.readFileSync('./certificado.key'),
  cert: fs.readFileSync("./certificado.cert")
};

http.createServer(app).listen(3000)
https.createServer(options, app).listen(3443, () => {
  console.log('Backend executando')
})