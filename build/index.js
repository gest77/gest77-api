"use strict";
require('dotenv').config();
var cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');
console.log("dot env : " + process.env.PORT);
express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', function (req, res) { return res.render('pages/index'); })
    .get('/times', function (req, res) { return res.send(showTimes()); })
    .listen(process.env.PORT, function () { return console.log("Listening on ".concat(process.env.PORT)); });
showTimes = function () {
    var result = '';
    var times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
        result += i + ' ';
    }
    return result;
};
//# sourceMappingURL=index.js.map