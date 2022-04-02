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

    new WOW().init();

    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
  

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut('slow');
    });

    
   
    $('#consultation form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
                },
            phone: "required"
        },
        messages: {
            name: {
                required: "Пожалуйста, введите Ваше имя",
                minlength: jQuery.validator.format("Минимально {0} символа")
            },
            phone: "Пожалуйста, введите Ваш номер телефона"
            }
    });

    $('input[name=phone]').mask("+7 (999) 999-99-99");


    function postForm(post_form) {
        $(post_form).submit(function(e) {
            e.preventDefault();
    
            if (!$(this).valid()) {
                return;
            }
    
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('#consultation').fadeOut();
                $('.overlay , #thanks').fadeIn('slow');
                $('.overlay , #thanks').delay(5000).fadeOut('slow');
                $('form').trigger('reset');
            });
            return false;
        });
    };

    postForm('#consultation-form')
    postForm('#consultation form')


    
});
