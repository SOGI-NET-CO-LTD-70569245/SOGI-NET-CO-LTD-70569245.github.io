/**
 * Infinite Scroll (v3) 共用初始化
 * - 下一頁網址由 _scroller-status 的 nextUrl 參數輸出成隱藏的 .js-infinite-next 連結。
 * - 載入的頁面裡沒有 .js-infinite-next 時，外掛判定為最後一頁並顯示「沒有更多內容了」，
 *   不會再去抓不存在的頁面（以前用 {{#}} 模板會抓到 404，顯示「載入失敗」）。
 * - 本頁就是最後一頁時不啟動外掛，直接顯示「沒有更多內容了」。
 *
 * @param {string} container 要附加內容的容器
 * @param {string} append    下一頁中要附加的項目選擇器
 */
function initInfiniteScroll(container, append) {
    var $container = $(container);
    if (!$container.length) return;

    if (!$('.js-infinite-next').length) {
        $('.scroller-status').children().hide().filter('.infinite-scroll-last').show();
        return;
    }

    $container.infiniteScroll({
        path: '.js-infinite-next',
        append: append,
        status: '.scroller-status',
    });
}
