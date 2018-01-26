$(document).ready(function() {

    // 关于Duplicate jQuery Selector警告：
    // 如果你在一个函数中重复写这个id的选择器，你就可能遇到这种警告，而这种警告通常实在Intellj系列的编辑器中显示。
    // 表示在代码中，多处使用了同一个id选择器，JQuery建议你使用一个变量去存储这个选择器，而不是每次用的时候便拿来调用一下，
    // 它不会帮你做缓存，而是重新去取。

    var blog_btn = $('a.blog-button');
    var main_post_list = $('.main-post-list');
    var panel_cover = $('.panel-cover');
    blog_btn.click(function() {
        // If already in blog, return early without animate overlay panel again.
        if (location.hash && location.hash === "#blog") return;
        if (panel_cover.hasClass('panel-cover--collapsed')) return;
        main_post_list.removeClass('hidden');
        var currentWidth = panel_cover.width();
        // var swing;
        if (currentWidth < 960) {
            panel_cover.addClass('panel-cover--collapsed');
            // panel_cover.backgroundImage = url('/assets/images/background-cover.jpg');
        } else {
            panel_cover.css('max-width', currentWidth);
            panel_cover.animate({'max-width': '700px', 'width': '30%'}, 400, swing = 'swing', function() {});
            // panel_cover.backgroundImage = url('/assets/images/background-cover---.jpg');
        }
    });

    if (window.location.hash && window.location.hash === "#blog") {
        panel_cover.addClass('panel-cover--collapsed');
        main_post_list.removeClass('hidden');
    }

    // if (window.location.pathname.substring(0, 5) === "/tags/") {
    //     panel_cover.addClass('panel-cover--collapsed');
    // }
    //
    // if (window.location.pathname.substring(0, 9) === "/archive/") {
    //     panel_cover.addClass('panel-cover--collapsed');
    // }

    var nav_warapper = $('.navigation-wrapper');
    var btn_m_icon = $('.btn-mobile-menu__icon');
    btn_m_icon.click(function() {
        if (nav_warapper.css('display') === "block") {
            nav_warapper.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                nav_warapper.toggleClass('visible animated bounceOutUp');
                nav_warapper.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
            });
            nav_warapper.toggleClass('animated bounceInDown animated bounceOutUp');
        } else {
            nav_warapper.toggleClass('visible animated bounceInDown');
        }
        btn_m_icon.toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
    });

    $('.navigation-wrapper .blog-button').click(function() {
        if (nav_warapper.css('display') === "block") {
            nav_warapper.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                nav_warapper.toggleClass('visible animated bounceOutUp');
                nav_warapper.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
            });
            nav_warapper.toggleClass('animated bounceInDown animated bounceOutUp');
        }
        btn_m_icon.toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
    });
});
