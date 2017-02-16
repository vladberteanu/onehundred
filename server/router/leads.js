var express = require('express')
var router = express.Router()
var conn = require('../models')
var shortid = require('shortid');


router.get('/', function(req, res) {

  var referralLink = req.query.referralLink
  console.log(req.query, referralLink)
  if (!referralLink) {
    return res.sendStatus(400)
  }

  conn.model('Lead').findOne({referralLink: referralLink}, function(err, lead) {
    if (err) {
        return res.sendStatus(500)
    }
    if (!lead) {
        return res.sendStatus(404)
    }
    res.send({lead: lead.toClient()})
  })
})


router.post('/', function(req, res) {
    var lead = req.body.lead

    if (!lead || !lead.email) {
        return res.send(400)
    }

    conn.model('Lead').findOne({email: lead.email}, function(err, existingLead) {
        if (err) {
            return res.send(500)
        }
        if (existingLead) {
            return res.send({ error: 'An invitation was already requested for this email address.'})
        }

        lead.created = Date.now()
        lead.referralLink = shortid.generate()

        conn.model('Lead').create(lead, function(err, lead) {
            if (err) {
                return res.sendStatus(500)
            }
            res.send({ lead: lead.toClient() })
        })
    })
})


module.exports = router