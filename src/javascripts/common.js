//////////////////////////////////
//    Utilities & Polyfills     //
//////////////////////////////////

//=require ./libs/slick.min.js
//// =require ./vednor/swiper-bundle.min.js
// =require ./libs/pushy.min.js
// =require ./libs/owl.carousel.min.js
// =require ./libs/ofi.min.js


$(function() {
    "use strict";

    // $(".input-otp").keyup(function () {
    //     if (this.value.length == this.maxLength) {
    //       var $next = $(this).next('.input-otp');
    //       if ($next.length)
    //           $(this).next('.input-otp').focus();
    //       else
    //           $(this).blur();
    //     }
    // });
    
    $('.btn-anchor').click(function(){
		$('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top -50
    }, 750);
//        $('#dropdown-category .btn-anchor').parent().hide();
		return false;
	});

    $.cookieBar('addTranslation', 'zh-TW', {
		message:	'為了提供您更優質的個人化體驗，本網站使用 cookies，若您繼續瀏覽本網站，代表您同意我們的 cookies 政策。',
		acceptText:	'我知道了!',
		infoText:	'了解隱私權政策',
	});
    $.cookieBar({
		style: 'bottom-left',
        language: 'zh-TW'
	});

    $('.btn-top').click(function(){
		$('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 750);
		return false;
	});


    $('#header .dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });

    // bootstrap.tooltip
    $('body').tooltip( {selector: '[data-toggle=tooltip]'} );

    // bootstrap.popover - click
    $('[data-toggle=popover]').popover({
        html : true,
        offset: '0 100px',
        title: function() {
          var title = $(this).attr("data-popover-content");
          return $(title).children(".popover-title").html();
        },
        content: function() {
          var content = $(this).attr("data-popover-content");
          return $(content).children(".popover-content").html();
        }
    });

    $('[data-toggle=popover]').on('click', function () {
        $('[data-toggle=popover]').not(this).popover('hide');
    });

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    // bootstrap.popover - hover
    $("[data-popover=true]").popover({ trigger: "manual" , html: true}).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 300);
    });

    //message board
    $('.btn-msg').click(function() {
        $('.alert').fadeIn();
        return false;
    })
    $('.btn-msg-close').click(function() {
        $('.alert').fadeOut();
    })
});

$(document).ready(function(){

//    $(".toast").toast('show');

    $('.owl-center').owlCarousel({
        loop:true,
        margin:0,
        autoplay:true,
        lazyLoad:true,
        nav: false,
        navText: ['',''],
        autoplayHoverPause:true,
        responsive:{
            0:{
                center: false,
                items:1
            },
            640:{
                center: true,
                items:2
            }
        }
    });
    $('.owl-4col').owlCarousel({
        loop:true,
        margin:0,
        autoplay:true,
        lazyLoad:true,
        nav: false,
        items: 4,
        navText: ['',''],
        autoplayHoverPause:true,
        responsive:{
            0:{
                center: false,
                items:1
            },
            768:{
                items:4
            }
        }
    });

    $('.slider-rwd-4').slick({
        slidesToShow: 4,
        autoplay: true,
        slidesToScroll: 4,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });

    $('.slider-rwd-3').slick({
        slidesToShow: 3,
        autoplay: false,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: "unslick"
            },
            {
                breakpoint: 835,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });

    $('.slider-rwd-2').slick({
        slidesToShow: 2,
        autoplay: false,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: "unslick"
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });

    $('.slider-single').slick({
        arrows: true,
        dots: false,
    });

    $('.slider-fluid').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 6,
//        arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
          }
        },
        {
          breakpoint: 800,
          settings: {
              arrows: true,
              dots: true,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 425,
          settings: {
              arrows: true,
              dots: true,
              slidesToShow: 2,
              slidesToScroll: 2
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    // select change className
    // $('.form-control-color').on('change', function () {
    //     $(this).focus().select();
    //     this.className = this.options[this.selectedIndex].className;
    // });
});

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));


// 191026

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('#header').removeClass('scroll-up').addClass('scroll-down');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#header').removeClass('scroll-down').addClass('scroll-up');
        }
    }
    lastScrollTop = st;
}

$('.btn-mobile-menu').on('click', function(event) {
    event.preventDefault();
    $('.btn-mobile-menu').toggleClass('active');
    $('.mobile-menu').slideToggle("fast");
    $("body").toggleClass('scroll-hidden');
    $(".mobile-menu-main").toggleClass('d-none');
});

$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > 800) {
    $('#menu-bottom').fadeIn();
  } else {
    $('#menu-bottom').fadeOut();
  }
});

//220321
$(function () {
    // js:ofi
    objectFitImages('img.of-cover');
    $('img.of-cover').css('opacity',1);

    // bootstrap dropdown change text on selection
    $(".dropdown-menu-select").on('click', 'a', function(){
        $(this).closest('.dropdown-select').find('.btn:first-child').text($(this).text());
        $(this).closest('.dropdown-select').find('.btn:first-child').val($(this).text());
    });
});

const shareData = {
    title: document.title,
    text: '我想與你分享' + document.title + '的精彩內容!',
    url: document.location.href,
}, btn = document.querySelector('#btn-share');

btn.addEventListener('click', async () => {
    try {
        await navigator.share(shareData)
    } catch(err) {
        console.log( 'Error: ' + err );
    }
});

$('select').selectpicker();

// var swiper = new Swiper(".swiper-center", {
//     loop: true,
//     pauseOnMouseEnter: true,
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     breakpoints: {
//         320: {
//             slidesPerView: 1,
//         },
//         640: {
//             slidesPerView: "auto",
//             centeredSlides: true,
//         }
//     },
// });

// const swiper = new Swiper(".swiper-rwd-2", {
//     spaceBetween: 20,
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
//     breakpoints: {
//         320: {
//             slidesPerView: 1,
//             pagination: {
//                 el: ".swiper-pagination",
//                 clickable: true,
//             },
//         },
//         1024: {
//             slidesPerView: 2,
//             pagination: {},
//         },
//     },
// });