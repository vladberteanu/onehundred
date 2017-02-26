var account = null;
var referredBy = null;


function getFormData(form) {
    return {
        name: form.find('input[name="customer-name"]').val(),
        email: form.find('input[name="customer-email"]').val(),
        country: form.find('input[name="customer-country"]').val(),
        reason: form.find('textarea').val()
    }
}


function validationMessage(data) {
    if (!data.name) {
        return 'Please tell us your name.'
    }
    if (!data.email) {
        return 'Please tell us the email address you want the invitation sent to.'
    }

    if (!data.country) {
        return 'Please tell us your country to determine if any legal requirements apply to you.'
    }
}

function getErrorBox(form) {
    return form.find('.error')
}


function displayRegistrationError(form, errorMessage) {
    var errorBox = getErrorBox(form)
    errorBox.html(errorMessage)
    errorBox.show()
}


function setReferralLink() {
    var referralLink = 'onehundred.me/?ref=' + (account ? account.referralLink : null);
    var referralLinkDom = $('.referral-link a')
    referralLinkDom.html(referralLink)
    referralLinkDom.attr('href', 'http://' + referralLink)
}


function displayRegistrationSuccess() {
    $('.cta-box').html($('#signup-success-tmpl').html())
    setReferralLink()
}


function register(form) {
    var errorBox = getErrorBox(form)
    var formData = getFormData(form)
    var errorMessage = validationMessage(formData)

    errorBox.hide()

    if (errorMessage) {
        displayRegistrationError(form, errorMessage)
        return false;
    }

    if (referredBy) {
        formData.referredBy = referredBy
    }

    $.ajax({
        type: "POST",
        url: "/api/leads",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({lead: formData}),
        success: function (response) {
            if (response.error) {
                displayRegistrationError(form, response.error)
            } else {
                account = response.lead
                displayRegistrationSuccess()
            }
        },
   });
    return false;
}


function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href
    }
    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
    var results = regex.exec(url)
    if (!results) {
        return null
    }
    if (!results[2]) {
        return ''
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "))
}


function displayReferralBar(friendName) {
    var name = friendName.replace(/\b\w/g, function(l){ return l.toUpperCase() })
    var referralBar = $('#referral-bar')
    referralBar.find('strong').html(name)
    referralBar.show()
    $('.menu-bar').addClass('with-referral')
}



function closeReferralBar() {
    $('.menu-bar').removeClass('with-referral')
}


function loadReferralBar() {
    var referralLink = getParameterByName('ref')

    if (!referralLink) {
        return
    }

    $.ajax({
        type: "GET",
        url: "/api/leads?referralLink=" + referralLink,
        dataType: "json",
        success: function (response) {
            if (response.lead) {
                displayReferralBar(response.lead.name)
                referredBy = response.lead.referralLink
            }
        },
   });
}


function shareOnFacebook() {
    var referralLink = account ? account.referralLink : null;

    FB.ui({
      method: 'feed',
      link: 'http://onehundred.me?ref=' + referralLink,
      caption: 'Start investing $100 monthly',
      picture: 'http://onehundred.me/assets/img/short-logo-large.png',
      description: 'The simplest investing experience ever.'
    }, function(response){});
}