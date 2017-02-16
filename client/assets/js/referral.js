
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
