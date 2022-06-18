var express = require('express');
var router = express.Router();

// Importar os métodos do Controller
const departmentController = require('../controllers/departmentController');

// Encaminha a requisição para o método adequado do Controller
/* Formato:
  route('/caminho da rota').tipoDeRequisição(arquivoController.método)
*/

router
// Define o endpoint dos métodos
  .route('/')
  // Leva ao método referente no arquivo Controller
  .post(departmentController.createDepartment); // POST /departments

router
  .route('/:id')
  .patch(departmentController.updateDepartment) // PATCH /departments/:id
  .delete(departmentController.deleteDepartment); // DELETE /departments/:id

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
