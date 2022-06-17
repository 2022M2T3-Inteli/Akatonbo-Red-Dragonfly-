var express = require('express');
var router = express.Router();

// Referencia o arquivo do Controller 
const roleController = require('./../controllers/roleController');

// Envia o tipo de requisição do Router para o Controller
router
  .route('/')
  .get(roleController.getAllRoles)
  .post(roleController.createRole);
  /* Estrutura:
  route('/caminho da rota').tipoDeRequisição(arquivoRolerController.métodoDaRequisição) 
  */

router
  .route('/new')
  .get(roleController.newRole);

router
  // Métodos que selecionam o role pela Pk id
  .route('/:id')
  .patch(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = router;
