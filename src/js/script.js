const vh = window.innerHeight / 100;
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(document).ready(function(){
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800 ) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $('a[href^="#"]').on('click', function() {
        let href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 370,   // по умолчанию «400» 
            easing: "linear"
        });
        return false;
    });
});