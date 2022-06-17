var express = require('express');
var router = express.Router();

// Referencia o arquivo do Controller
const assignmentController = require('./../controllers/assignmentController');

// Envia o tipo de requisição do Router para o Controller
/* Estrutura:
  route('/caminho da rota').tipoDeRequisição(arquivoRolerController.métodoDaRequisição) 
*/
router
  .route('/').post(assignmentController.createAssignment);

router
  .route('/new/:id').get(assignmentController.newAssignment);

router
  .route('/:id')
  .patch(assignmentController.updateAssignment)
  .delete(assignmentController.deleteAssignment);

module.exports = router;
