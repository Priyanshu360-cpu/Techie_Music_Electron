var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.originalUrl.replace("/",""));
  res.render('index', { title: req.originalUrl.replace("/","")});
});

module.exports = router;
