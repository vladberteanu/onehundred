var express = require('express')
var router = express.Router()
var conn = require('../../db')

router.get('/', function(req, res) {
  var Lead = conn.model('Lead')
  var referalLink = req.query.referalLink

  if (!referalLink) {
    return res.sendStatus(400)
  }

  Lead.findOne({referalLink: referalLink}, function(err, lead) {
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
  var Lead = conn.model('Lead')
  var leadData = req.body.lead


  lead.created = Date.now()

  Lead.create(lead, function(err, lead) {
    if (err) {
      return res.sendStatus(500)
    }
    res.send({ lead: lead.toClient() })
  })

})


module.exports = router