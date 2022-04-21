var input_text_max = 2000;
$('.input-count').html(input_text_max);
$('.input-limit').keyup(function() {
    var input_text_length = $('.input-limit').val().length;
    var input_text_remaining = input_text_max - input_text_length;
    $('.input-count').html(input_text_remaining).addClass('text-imp');
});
