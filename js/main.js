$(document).ready(function () {

    // 关于Duplicate jQuery Selector警告：
    // 如果你在一个函数中重复写这个id的选择器，你就可能遇到这种警告，而这种警告通常实在Intellj系列的编辑器中显示。
    // 表示在代码中，多处使用了同一个id选择器，JQuery建议你使用一个变量去存储这个选择器，而不是每次用的时候便拿来调用一下，
    // 它不会帮你做缓存，而是重新去取。

    var m_windown = $(window);
    var m_panel_left = $("#michael-panel-left");
    var m_panel_right = $("#michael-panel-right");
    var c_width = m_windown.width();
    var panel_left_width = m_panel_left.width();

    // var post_list_btn = $('.btn-border-small');
    var other_tag_btn = $('a.other_tag_btn');
    var blog_btn = $('a.blog-button');
    var main_post_list = $('.main-post-list');
    var panel_cover = $('.panel-cover');

    /*
    function add_panel_collapsed() {
        // If already in blog, return early without animate overlay panel again.
        if (location.hash && location.hash === "#blog") return;
        if (panel_cover.hasClass('panel-cover--collapsed')) return;
        main_post_list.removeClass('hidden');
        var currentWidth = panel_cover.width();
        var swing = 'swing';
        if (currentWidth < 960) {
            panel_cover.addClass('panel-cover--collapsed');
            // panel_cover.backgroundImage = url('/assets/images/background-cover.jpg');
        } else {
            panel_cover.css('max-width', currentWidth);
            panel_cover.animate({'max-width': '500px', 'width': '30%'}, 400, swing = 'swing', function() {});
            m_panel_right.css({'margin-left':500,'width':c_width - 500});
            // panel_cover.backgroundImage = url('/assets/images/background-cover---.jpg');
        }
    }*/
    // blog_btn.click(add_panel_collapsed());
    // post_list_btn.click(add_panel_collapsed());

    function panel_right_resize() {

        // 浏览器时下窗口可视区域宽度
        // alert($(window).width());
        // 浏览器时下窗口可视区域高度
        // alert($(window).height());
        // 浏览器时下窗口文档的高度
        // alert($(document).height());
        // 浏览器时下窗口文档body的高度
        // alert($(document.body).height());
        // 浏览器时下窗口文档body的总高度 包括border padding margin
        // alert($(document.body).outerHeight(true));
        // 浏览器时下窗口文档对于象宽度
        // alert($(document).width());
        // 浏览器时下窗口文档body的高度
        // alert($(document.body).width());
        // 浏览器时下窗口文档body的总宽度 包括border padding margin
        // alert($(document.body).outerWidth(true));
        // console.log('window.width = ' + $(window).width());

        // 窗口宽度
        c_width = m_windown.width();
        panel_left_width = m_panel_left.width();
        if (panel_left_width !== c_width) {
            if (panel_left_width >= 500) {
                m_panel_right.css({'margin-left': 500, 'width': c_width - 500});
            } else if (panel_left_width < 500) {
                m_panel_right.css({'margin-left': panel_left_width, 'width': c_width - panel_left_width});
            }
        } else {
            m_panel_right.css({'margin-left': 30, 'margin-right': 30, 'width': c_width - 60});
        }
    }

    other_tag_btn.click(function () {
        panel_right_resize();
    });

    blog_btn.click(function () {
        // If already in blog, return early without animate overlay panel again.
        if (location.hash && location.hash === "#blog") return;
        if (panel_cover.hasClass('panel-cover--collapsed')) return;
        main_post_list.removeClass('hidden');
        var currentWidth = panel_cover.width();
        var swing = 'swing';
        if (currentWidth < 960) {
            panel_cover.addClass('panel-cover--collapsed');
            // panel_cover.backgroundImage = url('/assets/images/background-cover.jpg');
        } else {
            panel_cover.css('max-width', currentWidth);
            panel_cover.animate({'max-width': '500px', 'width': '30%'}, 400, swing = 'swing', function () {
            });
            m_panel_right.css({'margin-left': 500, 'width': c_width - 500});
            // panel_cover.backgroundImage = url('/assets/images/background-cover---.jpg');
        }

        panel_right_resize();
    });

    // post_list_btn.click(function() {
    //     // If already in blog, return early without animate overlay panel again.
    //     var currentWidth = panel_cover.width();
    //     var swing = 'swing';
    //     if (currentWidth < 960) {
    //         // panel_cover.addClass('panel-cover--collapsed');
    //         // panel_cover.backgroundImage = url('/assets/images/background-cover.jpg');
    //     } else {
    //         panel_cover.css('max-width', currentWidth);
    //         panel_cover.animate({'max-width': '500px', 'width': '30%'}, 400, swing = 'swing', function() {});
    //         m_panel_right.css({'margin-left':500,'width':c_width - 500});
    //         // panel_cover.backgroundImage = url('/assets/images/background-cover---.jpg');
    //     }
    // });

    if (window.location.hash && window.location.hash === "#blog") {
        if (panel_cover.hasClass('panel-cover--collapsed')) return;
        panel_cover.addClass('panel-cover--collapsed');
        main_post_list.removeClass('hidden');
    }

    if (window.location.pathname.substring(0, 5) === "/tags/") {
        if (panel_cover.hasClass('panel-cover--collapsed')) return;
        panel_cover.addClass('panel-cover--collapsed');
        // main_post_list.removeClass('hidden');
    }

    if (window.location.pathname.substring(0, 9) === "/archive/") {
        if (panel_cover.hasClass('panel-cover--collapsed')) return;
        panel_cover.addClass('panel-cover--collapsed');
    }

    var nav_warapper = $('.navigation-wrapper');
    var btn_m_icon = $('.btn-mobile-menu__icon');
    btn_m_icon.click(function () {
        if (nav_warapper.css('display') === "block") {
            nav_warapper.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                nav_warapper.toggleClass('visible animated bounceOutUp');
                nav_warapper.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
            });
            nav_warapper.toggleClass('animated bounceInDown animated bounceOutUp');
        } else {
            nav_warapper.toggleClass('visible animated bounceInDown');
        }
        btn_m_icon.toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
    });

    var nav_blog_btn = $('.navigation-wrapper .blog-button');
    nav_blog_btn.click(function () {
        if (nav_warapper.css('display') === "block") {
            nav_warapper.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                nav_warapper.toggleClass('visible animated bounceOutUp');
                nav_warapper.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
            });
            nav_warapper.toggleClass('animated bounceInDown animated bounceOutUp');
        }
        btn_m_icon.toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
    });

    // 监听窗口宽度
    m_windown.resize(function () {
        panel_right_resize();
    });
});

window.onload = function () {
    var m_windown = $(window);
    var m_panel_left = $("#michael-panel-left");
    var m_panel_right = $("#michael-panel-right");
    var c_width = m_windown.width();
    var panel_left_width = m_panel_left.width();

    if (panel_left_width !== c_width) {
        if (panel_left_width >= 500) {
            m_panel_right.css({'margin-left': 500, 'width': c_width - 500});
        } else if (panel_left_width < 500) {
            m_panel_right.css({'margin-left': panel_left_width, 'width': c_width - panel_left_width});
        }
    } else {
        m_panel_right.css({'margin-left': 30, 'margin-right': 30, 'width': c_width - 60});
    }

    // m_windown.resize();
}
