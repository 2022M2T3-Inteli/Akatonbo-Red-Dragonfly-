var express = require('express');
var router = express.Router();

/* GET home page. É a rota padrão, abre quando a página carrega.  */
router.get('/', function (req, res) {
  // Renderiza a página index.ejs
  res.render('index');
});

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
