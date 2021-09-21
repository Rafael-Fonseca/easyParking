//Este é o index do backend
const express = require('express')
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = express()
const db = require('./config/db')
const consign = require('consign')


consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)

app.db = db

const options = {
  key: fs.readFileSync('./certificado.key'),
  cert: fs.readFileSync("./certificado.cert")
};

http.createServer(app).listen(3000)
https.createServer(options, app).listen(3443, () => {
  console.log('Backend executando')
})
