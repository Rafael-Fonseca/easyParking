//Este é o index do backend
const express = require('express')
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

module.exports = app;