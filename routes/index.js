var express = require('express');
var db = require('./common/db.js');
var router = express.Router();

router.get('/', function (req, res, next) {
    var sql = "SELECT * FROM crawler_video LIMIT 0,10 ";
    db.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render('index', {vs: result});
        }
    })
});
module.exports = router;
