var express = require('express');
var router = express.Router();

// Carrega a tela de login
router.get('/login', function (req, res) {
  res.render('pages/login');
}); // GET /auth/login

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
