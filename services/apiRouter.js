/**
 * 应用api router
 */
var express = require('express');
var router = express.Router();

var version = require('./controller/version.js');

router.get('/service/version',version.getVersion);

module.exports = router;