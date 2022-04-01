$(function(){
    $.fn.editable.defaults.mode = 'inline';
//    $.fn.editable.defaults.url = '/post';
    $('.editable-price').editable({
        type: 'number',
        validate: function(value) {
            if($.trim(value) == '') return '此欄位需填資料';
        },
        display: function(value) {
            $(this).text('$' + value);
        },
    });
    $('.editable-chk-on').editable({
        type: 'checklist',
        source: {'1': '有'},
        emptytext: '無'
    });
    $('.editable-chk-fast').editable({
        type: 'checklist',
        source: [
            {value: 1, text: '有'}
        ],
    });
    $('.editable-select-warranty').editable({
        prepend: "請選擇保固期",
        type: 'select',
        source: [
            {value: 1, text: '無保固'},
            {value: 2, text: '一年'}
        ],
    });
    $('.editable-select-storage').editable({
        prepend: "現貨狀況(非必選)",
        type: 'select',
        source: [
            {value: 1, text: '有'},
            {value: 2, text: '無'}
        ],
    });
    $('.editable-select-time').editable({
        prepend: "請選擇",
        type: 'select',
        source: [
            {value: 1, text: '30分鐘'},
            {value: 2, text: '45分鐘'}
        ],
    });
    $('.editable-select-low').editable({
        prepend: "套用機制",
        type: 'select',
        source: [
            {value: 1, text: '是'},
            {value: 2, text: '否'}
        ],
    });
});
