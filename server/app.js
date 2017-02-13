var express = require('express')
var app = express()

require('./middleware')(app)
require('./router')(app)

module.exports = app