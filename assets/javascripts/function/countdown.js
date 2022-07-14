$('[data-countdown]').each(function() {
    var $this = $(this), finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function(event) {
        $this.html(event.strftime(''
        + '<span class="count-time">%D</span>:'
        + '<span class="count-time">%H</span>:'
        + '<span class="count-time">%M</span>:'
        + '<span class="count-time">%S</span>'));
    })
    .on('finish.countdown', function(event) {
        $(this).html('<span class="mx-5">時間</span>')
            .parent().addClass('disabled');
    });
});
