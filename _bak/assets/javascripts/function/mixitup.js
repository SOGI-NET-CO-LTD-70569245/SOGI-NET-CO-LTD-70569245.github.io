//var noMixItemMsg = document.getElementById("noMixItemMsg");
//noMixItemMsg.style.display = "none";

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
            enable: false
        },
        controls: {
            toggleLogic: 'or',
        },
        callbacks: {
            onMixLoad: function(){
                $(this).mixItUp('setOptions', {
                    animation: {
                        enable: true
                    }
                });
            },
//            onMixStart: function(state){
//                noMixItemMsg.style.display = "none";
//            },
//            onMixFail: function(state){
//                noMixItemMsg.style.display = "flex";
//            },
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
