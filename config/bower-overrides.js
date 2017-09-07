'use strict';

module.exports = function(env, packerConfig) {
    return {
        "": {
            main: "dist/jquery.min.js"
        },
        "jquery-migrate": {
            main: "jquery-migrate.min.js"
        }
    };
};