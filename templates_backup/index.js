'use strict'

const Express = require('Express')
const Io = require('socket.io')
const Join = require('path').join
const DotExpress = require('express-dot-engine')

const SETUP = {
  port: process.env.NODE_PORT || 3000,
  host: process.env.NODE_HOST || '0.0.0.0'
}

const App = Express()


App.engine('html', DotExpress.__express)
App.set('view engine', 'html')
App.set('views', Join(__dirname, 'src', 'html'))

App.use(Express.static(Join(__dirname, 'dist', 'public')))
App.get('/', (req, res) => res.render('index'))

App.listen(SETUP.port, SETUP.host,
  () => console.log(`Listening on ${SETUP.host}:${SETUP.port}`)
)
