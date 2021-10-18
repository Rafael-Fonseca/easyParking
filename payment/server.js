//Este é o index do backend
const express = require('express')
const app = express()
const consign = require('consign')
const http = require('http')

consign()
  .include('../config/middlewares.js')
  .then('./config/routes.js')
  .into(app)

http.createServer(app).listen(3500)
console.log('Backend executando')
