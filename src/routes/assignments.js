var express = require('express');
var router = express.Router();

// Importar os métodos do Controller
const assignmentController = require('./../controllers/assignmentController');

// Encaminha a requisição para o método adequado do Controller
/* Formato:
  route('/caminho da rota').tipoDeRequisição(arquivoController.método)
*/

router.route('/').post(assignmentController.createAssignment); // POST /assignments

router.route('/new/:id').get(assignmentController.newAssignment); // GET /assignments/new/:id

router
  .route('/:id')
  .patch(assignmentController.updateAssignment) // PATCH /assignments/:id
  .delete(assignmentController.deleteAssignment); // DELETE /assignments/:id

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
