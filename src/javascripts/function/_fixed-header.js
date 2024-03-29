var footerHeight = $('.carousel-simler').outerHeight(true) + $('#footer').outerHeight(true);
$('.fixed-header').affix({
   offset: {
       top: 50,
       bottom: function () {
           return (this.bottom = footerHeight)
       }
   }
});

$(window).load(function() {
  $('.fixed-header a[href*=#]:not([href=#])').click(function() 
  {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) 
    {
      
      var target = $(this.hash),
      headerHeight = $(".fixed-header").height() + 70; // Get fixed header height
            
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              
      if (target.length) 
      {
        $('html,body').animate({
          scrollTop: target.offset().top - headerHeight
        }, 500);
        return false;
      }
    }
  });
})(jQuery);