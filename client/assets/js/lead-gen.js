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
            }
        },
   });

    return false;
}