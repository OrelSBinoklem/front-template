'use strict';

module.exports = function(env, packerConfig) {
    return {
        "jquery": {
            main: "dist/jquery.min.js"
        },
        "reset-css": {ignore: !(packerConfig.framework == "reset")},
        "jquery-migrate": {
            main: "jquery-migrate.min.js"
        },
        "bootstrap": {
            main: [
                "dist/css/bootstrap.min.css",
                "dist/js/bootstrap.min.js"
            ],
            ignore: !(packerConfig.framework == "bootstrap")
        },
        "foundation-sites": {
            main: [
                "dist/css/foundation.min.css",
                "dist/js/foundation.min.js"
            ],
            ignore: !(packerConfig.framework == "foundation")
        },

        "font-awesome": {
            main: [
                "css/font-awesome.min.css",
                "fonts/*ontAwesome.*"
            ]
        },

        "malihu-custom-scrollbar-plugin": {
            "main": [
                "./jquery.mCustomScrollbar.concat.min.js",
                "./jquery.mCustomScrollbar.min.css",
                "./mCSB_buttons.png"
            ]
        },

        "slideout.js": {
            "main": "dist/slideout.min.js"
        },

        "slick-carousel": {
            "main": [
                "slick/slick.min.js",
                "slick/slick.css",
                "slick/ajax-loader.gif",
                "slick/fonts/slick.*"
            ]
        },

        "multilevelpushmenu": {
            "main": [
                "jquery.multilevelpushmenu.css",
                "jquery.multilevelpushmenu.min.js"
            ]
        },

        "ResponsiveMultiLevelMenu": {
            "main": [
                "css/component.css",
                "js/jquery.dlmenu.js",
                "fonts/icomoon.*"
            ]
        },

        "modernizr": {
            "main": [
                "modernizr.js"
            ]
        },

        "isotope": {
            "main": "dist/isotope.pkgd.min.js"
        },

        "svg4everybody": {
            "main": "dist/svg4everybody.min.js"
        },

        "svg-injector": {
            "main": "dist/svg-injector.min.js"
        },

        "jquery-mask-plugin": {
            "main": "dist/jquery.mask.min.js"
        }
    };
};