var mongoose = require('mongoose')
var config = require('../config')
var leadSchema = require('./lead')

var connection = mongoose.createConnection(
    config.get('database:host'),
    config.get('database:name'),
    config.get('database:port')
)

connection.model('Lead', leadSchema)

module.exports = connection
