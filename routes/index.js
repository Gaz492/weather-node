var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        dev: process.env.BROWSER_REFRESH_PORT,
        siteTitle: 'Home Weather',
        title: 'Home Weather',
        siteName: 'Weather',
    });
});

module.exports = router;
