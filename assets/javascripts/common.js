$(function() {
    "use strict";

    //jquery.scrollUp
    $.scrollUp({
        scrollImg: true,
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


//    $(function() {
//    function reposition() {
//        var modal = $(this),
//            dialog = modal.find('.modal-dialog');
//        modal.css('display', 'block');
//
//        // Dividing by two centers the modal exactly, but dividing by three
//        // or four works better for larger screens.
//        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
//    }
//    // Reposition when a modal is shown
//    $('.modal').on('show.bs.modal', reposition);
//    // Reposition when the window is resized
//    $(window).on('resize', function() {
//        $('.modal:visible').each(reposition);
//    });
//});




});

$(document).ready(function(){

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
                breakpoint: 800,
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
        arrows: false,
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
});

$(function(){
    $('.btn-anchor').click(function(){
		$('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top-50}, 750);
		return false;
	});
});

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

