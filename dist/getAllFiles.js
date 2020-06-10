"use strict";
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
function getAllFiles(imagespath) {
    return resolveDir(imagespath);
}
exports.getAllFiles = getAllFiles;
var resolveDir = function (parentpath) {
    var ls = fs.readdirSync(parentpath);
    var arrMap = ls.map(function (name) {
        var p = path.join(parentpath, name);
        var pathIsDir = isDir(p);
        if (pathIsDir) {
            return resolveDir(p);
        }
        else {
            return resolveFile(p);
        }
    });
    return [].concat.apply([], arrMap);
};
var resolveFile = function (p) {
    var file = fs.readFileSync(p);
    return [
        {
            file: file,
            name: getClassName(p),
            extname: path.extname(p),
            filePath: p
        },
    ];
};
var isDir = function (p) {
    try {
        var stat = fs.lstatSync(p);
        return stat.isDirectory();
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
var getClassName = function (p) {
    var ext = path.extname(p);
    var noExt = p.split(ext)[0];
    return noExt.split(path.sep).slice(-1)[0];
};
