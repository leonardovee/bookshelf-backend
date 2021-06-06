const express = require('express')
const app = express()
const setupApp = require('./setup.js')
const setupRoutes = require('./routes.js')

const dotenv = require('dotenv-safe')

dotenv.config()

setupApp(app)
setupRoutes(app)

module.exports = app
