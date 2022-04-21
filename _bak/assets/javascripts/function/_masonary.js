$(function () {
                
                //isotope
                var $container = $('.js-masonary'),
                filters = {};
                //box
                $container.imagesLoaded( function(){
                    $container.isotope({
                    itemSelector : '.item',
                });
                //infinite
                $container.infinitescroll({
                    navSelector  : '.infinite-nav',    // selector for the paged navigation 
                    nextSelector : '.infinite-nav a',  // selector for the NEXT link (to page 2)
                    itemSelector : '.item',     // selector for all items you'll retrieve
                    loading: {
                        finishedMsg: '已經置底',
                        img: '../img/ui/loading.gif'
                      }
                    },
                    // call Isotope as a callback
                    function( newElements ) {
                        setTimeout(function() {
                      $container.isotope( 'appended', $( newElements ) ); 
                      }, 0);
                    }
                  );
                //filter
                $('.filter a').click(function(){
                  var $this = $(this),
                      isoFilters = [],
                      prop, selector;
                  filters[ $this.data('group') ] = $this.data('filter');

                  for ( prop in filters ) {
                    isoFilters.push( filters[ prop ] )
                  }
                  selector = isoFilters.join('');
                  $container.isotope({ filter: selector });

                  return false;
                });
                  $('.masonary-nav').find('.option-set a').click(function(){
                    var $this = $(this);
                    if ( !$this.hasClass('selected') ) {
                      $this.parents('.option-set').find('.selected').removeClass('selected');
                      $this.addClass('selected');
                    }
                  });
                });

            });