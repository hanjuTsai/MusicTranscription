const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const compression = require('compression')
const morgan = require('morgan')
const http = require('http')
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const routes = require('./routes')
const config = require('../config')
const flash = require('connect-flash')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

exports.server = function() {
  const app = express()
  app.use(cookieParser('hagreanvaio'))
  
  if ('development' === app.get('env')) {
    app.use(errorhandler())
  }

  app.use(session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    secret: 'musicsheetconverter',
  }))
  
  app.use(flash())
  app.set('port', config.server_port || 4000)

  app.use(morgan('dev'))
  app.use(compression())

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  }))
  
  app.use(methodOverride('_method'))

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", config.client_host)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
  })
  
  mongoose.connect('mongodb+srv://huangfu:r980213r@sheet-converter-biuvl.gcp.mongodb.net/test?retryWrites=true&w=majority', config.dboptions)
  .then(res => {
    console.log('mongo db connection created')
  })

  routes(app)

  const server = http.createServer(app)
    .listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'))
    })

  server.timeout = 1000000000
}
