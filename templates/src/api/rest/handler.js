const Join = require('path').join
const Rethink = require(Join(__dirname, '..', 'db'))
const Winston = require('winston')
const Stringify = require('streaming-json-stringify')

const Handler = {}


Handler.preparate = (req, res, next) => {
  res.type('application/json')
  next()
}

Handler.list: (req, res) => {
  Rethink.db.table(req.params.entity)
    .toStream()
    .on('error', Winston.error)
    .pipe(Stringify())
    .pipe(res)
}

module.exports = Handler
