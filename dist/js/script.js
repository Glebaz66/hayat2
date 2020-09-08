//slider
$(document).ready(function(){
    $('.portfolio').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: true,
        fade: true,
        cssEase: 'linear',
        arrows: false,
         responsive: [
            {
              breakpoint: 768,
              settings: {
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                adaptiveHeight: true,
                fade: true,
                cssEase: 'linear',
                arrows: true,
                appendArrows: $('.arrows'),
                prevArrow: '<div id="prev" type="button" class="arrow arrow__left"></div>',
                nextArrow: '<div id="next" type="button" class="arrow"></div>',
              },
            },
          ]
    });

    //custom next btn
    $('.next-btn').click(function(){
        $('.portfolio').slick('slickNext');
    })
    $('.arrow__left').click(function(){
        $('.portfolio').slick('slickPrev');
    });
    $('.arrow').click(function(){
        $('.portfolio').slick('slickNext');
    });

    //slides counter
    const totalSlides = $('.slick-track ').children();

    if(!totalSlides.length || totalSlides.length < 0) return;
    if(totalSlides.length > 0 || totalSlides.length < 10 ) {
        $('.counter .total').text('0' + totalSlides.length);
    } 
    if(totalSlides.length >= 10 ) {
        $('.counter .total').text(totalSlides.length);
    }

    //set first slide
    const firstSlide = $('.portfolio').slick('slickCurrentSlide');
    
    //get current slide
    $('.portfolio').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.counter .current').text('0' + (firstSlide + 1));

        if(!currentSlide || currentSlide < 0) return;
        if(currentSlide > 0 && currentSlide < 9){
            $('.counter .current').text('0' + (currentSlide + 1));
        };
        if(currentSlide >= 9){
            $('.counter .current').text(currentSlide + 1);
        };
    });

    //nav add backdrop when opened to mobile
    const paddingBottom = $('.header.header .menu .navbar').css('padding-bottom');

    $('.navbar-toggler').on('click', function(){
        $('.menu').toggleClass('opened');

        if($('.menu').hasClass('opened')){
            $('.header.header .menu .navbar').css({'backgroundColor': '#fff', 'padding-bottom': '70%'})
            $('body').css({'overflow': 'hidden'})
        } else {
            $('.header.header .menu .navbar').css({'backgroundColor': 'none', 'padding-bottom': paddingBottom})
            $('body').css({'overflow': 'unset'})
        }
    });

    //click on menu items should close menu
    $('.menu .navbar-collapse').on('click', function(e){
        const target = e.target;
        // console.log(target);
        if( target.classList.contains('mobile-social__link')) { return }

        if(target.nodeName == 'A'){
            $('.menu').removeClass('opened');
            $('.header.header .menu .navbar').css({'backgroundColor': 'none', 'padding-bottom': paddingBottom});
            $('body').css({'overflow': 'unset'});
            $('.navbar-toggler').attr('aria-expanded', false);
            $('.navbar-toggler').addClass('collapsed');
            $('.navbar-collapse').removeClass('show');
        }
    })
});