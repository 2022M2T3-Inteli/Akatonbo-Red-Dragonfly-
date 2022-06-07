var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /* Renderiza a página index.ejs */
  res.render('index');
});

module.exports = router;
