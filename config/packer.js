'use strict';

module.exports = function(env) {
    return {
        dest: 'build',          //(String: "путь" Def:"public")

        imgCompressPolicy: "simple",  //(String: "good" | "simple" Notdef)
        webp: false,                  //(boolean: true|false, Def:false)
        spritePngPostfix2x: false,    //(Boolean: false | String: "имя файла" Def: false)
        spriteSvgClearColor: false,   //(boolean: true|false, Def:false)

        pugOrganizationCodePolicy: "extends", //(String: "extends" | "includes"       Notdef)

        jQueryMigrate: true,          //(boolean: true|false, Def: true).
        autoprefixer: true,           //(boolean: true|false, Def: true).
        autoprefixerOptions: {
            browsers: ['last 10 versions', "Firefox > 40"],
            cascade: false
        },

        //Второстепенные опции
        src: "src",                    // (String: "путь" Def:".").
        bowerDest: "vendor"            // (String: "путь" Notdef).
    };
};