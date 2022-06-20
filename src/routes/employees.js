var express = require('express');
var router = express.Router();

// Importar os métodos do Controller
const employeeController = require('./../controllers/employeeController');

// Encaminha a requisição para o método adequado do Controller
/* Formato:
  route('/caminho da rota').tipoDeRequisição(arquivoController.método)
*/

router
  .route('/')
  .get(employeeController.getAllEmployees) // GET /employees
  .post(employeeController.createEmployee); // POST /employees

router.route('/new').get(employeeController.newEmployee); // GET /employees/new

router
  .route('/:id')
  .get(employeeController.getEmployee) // GET /employees/:id
  .patch(employeeController.updateEmployee) // PATCH /employees/:id
  .delete(employeeController.deleteEmployee); // DELETE /employees/:id

router.route('/:id/edit/').get(employeeController.editEmployee); // GET /employees/edit/:id

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
