var express = require('express');
var db=require('./common/mysql.js');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  db.getConnection()
  res.render('index', { title: 'Express' });
});
module.exports = router;
