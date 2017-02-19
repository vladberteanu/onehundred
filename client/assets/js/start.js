$(document).ready(function(){
    $('.testimonial-carrousel').slick({
        autoplay: true,
        dots: true
    });

    loadReferralBar();

    $('.cta-box').html($('#signup-tmpl').html())

    $( ".signup-form" ).submit(function(event) {
        event.preventDefault();
        register($(this))

    });
});
