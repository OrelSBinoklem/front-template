'use strict';
const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');

const copyFilesDest = [
    'config/bootstrap-modules.js',
    'config/bootstrap-modules.scss',
    'config/bootstrap-variables.scss',
    'config/bootstrap-variables-defaults.scss',
];

module.exports = function(config) {
    var exists = false;
    for(var i in copyFilesDest) {
        if(fs.existsSync(path.join(process.cwd(), copyFilesDest[i]))) {
            exists = true;
            break;
        }
    }

    if( !exists ) {
        if(config.framework == "bootstrap") {
            copydir.sync(path.join(process.cwd(), "packer/preparation-basic-template/framework/bootstrap/config"), path.join(process.cwd(), "config"));
            copydir.sync(path.join(process.cwd(), "packer/preparation-basic-template/framework/bootstrap/sass-for-project"), path.join(process.cwd(), config.src, "sass/base"));
        }
    }
};