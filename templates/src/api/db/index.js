'use strict'

let db = 'unijas_test_'

if (process.env.NODE_ENV === 'production') {
  db += 'production'
} else if (process.env.NODE_ENV === 'test') {
  db += 'test'
} else {
  db += 'development'
}

const Rethink = require('rethinkdbdash')({ silent: true })

module.exports = {
  db: Rethink.db(db),
  instance: Rethink
}
