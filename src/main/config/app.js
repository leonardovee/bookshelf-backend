const express = require('express')
const app = express()
const setupApp = require('./setup.js')
const setupRoutes = require('./routes.js')

setupApp(app)
setupRoutes(app)

module.exports = app
