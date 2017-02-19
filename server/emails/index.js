var fs = require('fs')
var Handlebars = require('handlebars')

var secretKeys = require('../secretKeys')


function sendWelcomeEmail(lead, done) {
    var source = fs.readFileSync('./emails/templates/welcome.hbs').toString()
    var referralLink = 'http://onehundred.me?ref=' + lead.referralLink
    var template = Handlebars.compile(source);
    var templateData = {
        name: lead.name,
        link: referralLink,
    }

    var html = template(templateData)
    var mailgun = require('mailgun-js')({apiKey: secretKeys.mailgunApiKey, domain: secretKeys.mailgunDomain});

    var data = {
      from: 'Team OneHundred<team@oneundred.me>',
      to: lead.email,
      subject: 'Welcome to OneHundred!',
      html: html,
    };

    mailgun.messages().send(data, done);
}

module.exports = sendWelcomeEmail