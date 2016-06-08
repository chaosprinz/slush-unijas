'use strict'

const Join = require('path').join
const Express = require('Express')
const BodyParser = require('body-parser')
const App = Express()
const Winston = require('winston')

const RouteHandler = require(Join(__dirname, 'handler'))

const Logger = (req, res, next) => {
  let msg = `${req.method} - Request`
  let date = new Date
  Winston.info(msg, {
    url: req.url,
    from: req.ip,
    timestamp: date.toDateString() + ' ' + date.toTimeString()
  })
  next()
}

App.on('mount', () => Winston.info('API-Server mountet'))

App.use(Logger)
App.use(BodyParser.json())
App.use(RouteHandler.preparate)

App.get('/', RouteHandler.base)
App.get('/:entity', RouteHandler.entities.list)
App.get('/:entity/:id', RouteHandler.entities.sendOne)
App.post('/:entity', RouteHandler.entities.create)

module.exports = App
