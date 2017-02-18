var account = null;


function getFormData(formId) {
    var selectorInput = '#' + formId + ' input[name='
    var selectorTextArea = '#' + formId + ' textarea'

    return {
        name: $(selectorInput + '"customer-name"]').val(),
        email: $(selectorInput + '"customer-email"]').val(),
        country: $(selectorInput + '"customer-country"]').val(),
        reason: $(selectorTextArea).val()
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

function getErrorBox(formId) {
    return $('#' + formId + ' .error');
}


function displayRegistrationError(formId, errorMessage) {
    var errorBox = getErrorBox(formId)
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
    setReferralLink()
    $('.signup-box').hide()
    $('.signup-success-box').fadeIn()
}


function register(formId) {
    var errorBox = getErrorBox(formId)
    var formData = getFormData(formId)
    var errorMessage = validationMessage(formData)

    errorBox.hide()

    if (errorMessage) {
        displayRegistrationError(formId, errorMessage)
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/api/leads",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({lead: formData}),
        success: function (response) {
            if (response.error) {
                displayRegistrationError(formId, response.error)
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
    var referralBar = $('#referral-bar')
    referralBar.find('strong').html(friendName)
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
    }, function(response){});
}