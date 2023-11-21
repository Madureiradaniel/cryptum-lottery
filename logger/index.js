const pino = require('pino');

module.exports = pino({
  level: process.env.LEVEL_LOG || 'info',
});