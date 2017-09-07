'use strict';
const requireDir = require('require-dir');
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const through2 = require("through2").obj;
const runSequence = require('run-sequence');
const combine = require('stream-combiner2').obj;
const gulpWebpack = require('gulp-webpack');
const gulpNotify = require("gulp-notify");

var configurationsRelatedToBower = ["bower.json", "config/packer.js", "config/bower-overrides.js", "config/bower-concat.js"];

var packer = function(env, maincallback) {
    const config = require("../config/packer")(env);
    const configBowerOverrides = require("../config/bower-overrides")(env, config);
    const configBowerConcat = require("../config/bower-concat")(env, config);
    const middlewars = requireDir("./middleware");
    const gulpMediator = require("./gulp-mediator/gulp")(env);
    const webpackMediator = require("./webpack-mediator/webpack")(env);
    const bowerMediator = require("./bower-mediator/bower")(env);

    var taskDependencies = [];

    for(var key in middlewars) {
        if(!middlewars[key](config)) {
            console.log("Программа неможет дальше выполняться");
            return false;
        }
    }

    const basicTemplate = requireDir("./preparation-basic-template");
    for(var key in basicTemplate) {
        basicTemplate[key](config);
    }

    /*
    gulp.task('gulp:webpack', function() {
        return combine(
            gulp.src(config.src + '/main.js'),
            gulpWebpack(webpackMediator.config(config)),
            gulp.dest(config.dest)
        ).on('error', gulpNotify.onError("Error: <%= error.message %>");
    }).start('gulp:webpack');*/

    var bowerRun = false;

    if(!fs.existsSync(path.join(process.cwd(), "packer/bower-mediator/last-run.json")) || !fs.existsSync(path.join(process.cwd(), "packer/bower-mediator/modules-data.json"))) {
        bowerRun = true;
    } else {
        for(var i in configurationsRelatedToBower) {
            var bowerLastRun = fs.statSync(path.join(process.cwd(), "packer/bower-mediator/last-run.json")).mtime.getTime();
            if(fs.statSync(path.join(process.cwd(), configurationsRelatedToBower[i])).mtime.getTime() > bowerLastRun) {
                bowerRun = true;
                break;
            }
        }
    }

    var bower;
    if(bowerRun) {
        gulp.task('bower', function() {
            return bowerMediator.copyAndConcat(config, configBowerOverrides, configBowerConcat)
                .pipe(gulp.dest(path.join(config.dest, config.bowerDest))).on("end", function() {
                    bower = bowerMediator.getDependenciesAndModulePaths(config);
                    fs.writeFile(path.join(process.cwd(), "packer/bower-mediator/last-run.json"), JSON.stringify({lastRun: new Date().getTime()}));
                    fs.writeFile(path.join(process.cwd(), "packer/bower-mediator/modules-data.json"), JSON.stringify(bower));
                });
        });
        taskDependencies.push(['bower']);
    } else {
        var filedata = fs.readFileSync(path.join(process.cwd(), "packer/bower-mediator/modules-data.json"));
        bower = JSON.parse(filedata.toString());
    }

    require('easy-gulp-by-orel')(function() {
        return gulpMediator.config(config, bower);
    });
    if(env == "production") {
        taskDependencies.push(['easy:gulp:by:orel:production']);
    }
    if(env == "development") {
        taskDependencies.push(['easy:gulp:by:orel']);
    }

    taskDependencies.push(function(callback) {
        maincallback();
        //callback();
    });
    runSequence.apply(null, taskDependencies);
};

module.exports = packer;