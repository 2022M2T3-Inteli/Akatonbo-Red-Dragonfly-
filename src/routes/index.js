var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  // Renderiza a página index.ejs
  res.render('index');
});

module.exports = router;
