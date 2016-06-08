'use strict'

const Express = require('Express')
const Join = require('path').join
const DotExpress = require('express-dot-engine')

const SETUP = {
  port: process.env.NODE_PORT || 3000,
  host: process.env.NODE_HOST || '0.0.0.0'
}

const App = Express()
const Server = require('http').Server(App)
const Io = require('socket.io')(Server)


App.engine('html', DotExpress.__express)
App.set('view engine', 'html')
App.set('views', Join(__dirname, 'src', 'html'))

App.use(Express.static(Join(__dirname, 'dist', 'public')))
App.use('/api', require(Join(process.cwd(), 'src', 'api', 'rest', 'routes')))
App.get('/', (req, res) => res.render('index'))

Io.on('connection', () => {

})

App.listen(SETUP.port, SETUP.host,
  () => console.log(`Listening on <%= "${SETUP.host}:${SETUP.port}"%>`)
)
