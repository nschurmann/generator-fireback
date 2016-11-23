const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/environment')
const http = require('http')

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options)
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err)
  process.exit(-1)
})

// Populate databases with sample data
if (config.seedDB) require('./config/seed')

// Setup server
let app = express()
const server = http.createServer(app)
require('./config/express')(app)
require('./routes')(app)

// Start server
function startServer() {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
  })
}

setImmediate(startServer)


// Expose app
module.exports = app
