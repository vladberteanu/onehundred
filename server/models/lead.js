var _ = require('lodash')
var Schema = require('mongoose').Schema


var leadSchema = new Schema(
    {
        fullName: String,
        email: String,
        reason: String,
        country: String,
        referalLink: String,
        created: Date,
    }
)


leadSchema.methods.toClient = function() {
  return _.pick(this, ['fullName', 'referalLink'])
}


module.exports = leadSchema