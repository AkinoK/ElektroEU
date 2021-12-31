let express = require('express');
let router = express.Router();

exports.home = function(req, res, next) {
    res.render('index', { title: 'Home'});
};