var fs = require('fs')
  , Log = require('log')
  , log = new Log('debug', fs.createWriteStream('./../logs/Server.log'));

console.log = (Message) => {
    log.error(Message);
}

console.error = (Message) => {
  log.error(Message);
}