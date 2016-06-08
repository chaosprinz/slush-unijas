const Join = require('path').join
const Rethink = require(Join(__dirname, '..', 'db'))
const Winston = require('winston')
const Stringify = require('streaming-json-stringify')

const Handler = {}


Handler.preparate = (req, res, next) => {
  res.type('application/json')
  next()
}

Handler.base = (req, res) => {
  Rethink.db.table('entities')
    .toStream()
    .on('error', Winston.error)
    .pipe(Stringify())
    .pipe(res)
}

Handler.entities = {
  list: (req, res) => {
    Rethink.db.table(req.params.entity)
      .toStream()
      .on('error', Winston.error)
      .pipe(Stringify())
      .pipe(res)
  },
  sendOne: (req, res) => {
    Rethink.db.table(req.params.entity)
      .get(req.params.id)
      .then((result) => res.json(result))
  },
  create: (req, res) => {
    Rethink.db.table(req.params.entity)
      .insert(req.body)
      .then(result => res.json(result))
  }
}

module.exports = Handler
