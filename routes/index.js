var express = require('express');
var router = express.Router();
let controlerIndex = require('../controller/index');

/* GET home page. */
router.get('/', controlerIndex.home);

module.exports = router;