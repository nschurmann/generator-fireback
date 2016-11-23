// Set default node environment to development
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') {
  // Register the Babel require hook
  // require('babel-core/register')
}

// Export the application
module.exports = require('./app')
