$(".row").each(function(i){

    var layout = 'grid',
        $filterSelect = $('#FilterSelect-' + (i+1)),
        $sortSelect = $('#SortSelect-' + (i+1)),
        //$container = $('.js-mixitup'),
        $container = $('#mixitup-' + (i+1)),
        $changeLayout = $('#ChangeLayout-' + (i+1));

    $container.mixItUp({
//        load: {
//            filter: '.cat1'
//        },
        selectors: {
            filter: '.filter-' + (i+1),
            target: '.mix-item'
        },
        animation: {
//            animateChangeLayout: true, // Animate the positions of targets as the layout changes
//            animateResizeTargets: true, // Animate the width/height of targets as the layout changes
//            effects: 'fade rotateX(-40deg) translateZ(-100px)',
            enable: false
        },
        controls: {
//            toggleFilterButtons: true,
            toggleLogic: 'or',
//            activeClass: 'active',
        },
        callbacks: {
            onMixLoad: function(){
                $(this).mixItUp('setOptions', {
                    animation: {
                        enable: true
                    }
                });
            }
        },
//        layout: {
//            containerClass: 'grid-view' // Add the class 'list' to the container on load
//        }
    });

    $filterSelect.on('change', function(){
        $container.mixItUp('filter', this.value);
    });

    $sortSelect.on('change', function(){
        $container.mixItUp('sort', this.value);
    });


    /*
    $('.btn-grid-view').on('click', function(){
        layout = 'grid-view';
        $container.mixItUp('changeLayout', {
            containerClass: layout // change the container class to "grid"
        });
    });

    $('.btn-list-view').on('click', function(){
        layout = 'list-view';
        $container.mixItUp('changeLayout', {
            containerClass: layout // change the container class to "grid"
        });
    });

    $('.btn-list-view, .btn-grid-view').on('click', function(){
        $('.active').removeClass('active');
        $(this).addClass('active');
    });

    $changeLayout.on('click', function(){
        if(layout == 'list-view'){
            layout = 'grid-view';
            $changeLayout.html('<i class="fa fa-th-list"></i>');
            $container.mixItUp('changeLayout', {
                containerClass: layout
            });
        } else {
            layout = 'list-view';
            $changeLayout.html('<i class="fa fa-th"></i>');
            $container.mixItUp('changeLayout', {
                containerClass: layout
            });
        }
    });
    */

});
