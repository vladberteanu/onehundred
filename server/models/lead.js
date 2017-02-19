var _ = require('lodash')
var Schema = require('mongoose').Schema


var leadSchema = new Schema(
    {
        name: String,
        email: String,
        reason: String,
        country: String,
        referralLink: String,
        referredBy: String,
        created: Date,
    }
)


leadSchema.methods.toClient = function() {
  return _.pick(this, ['name', 'referralLink'])
}


module.exports = leadSchema