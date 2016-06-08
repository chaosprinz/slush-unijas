const Join = require('path').join

const CWD = process.cwd()

let db = '<%= appNameSlug %>_'

if (process.env.NODE_ENV === 'production') {
  db += 'production'
} else if (process.env.NODE_ENV === 'test') {
  db += 'test'
} else {
  db += 'development'
}

const Rethink = require('rethinkdbdash')({
  db: db
})

module.exports = {
  db: Rethink
}
