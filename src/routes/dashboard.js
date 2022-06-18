var express = require('express');
var router = express.Router();

// Importar os métodos do Controller
const dashboardController = require('./../controllers/dashboardController');


// Encaminha a requisição para o método adequado do Controller
/* Formato:
  route('/caminho da rota').tipoDeRequisição(arquivoController.método)
*/

// Dashboard - Tabela
router.route('/table').get(dashboardController.getTable); // GET /dashboard/table

// Dashboard - Gráfico
router.route('/chart').get(dashboardController.getChart); // GET /dashboard/chart

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
