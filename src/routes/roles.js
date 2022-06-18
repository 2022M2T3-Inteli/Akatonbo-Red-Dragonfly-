var express = require('express');
var router = express.Router();

// Referencia o arquivo do Controller
const roleController = require('./../controllers/roleController');

// Encaminha a requisição para o método adequado do Controller
/* Formato:
  route('/caminho da rota').tipoDeRequisição(arquivoController.método)
*/

router
  .route('/')
  .get(roleController.getAllRoles) // GET /roles
  .post(roleController.createRole); // POST /roles

router
  .route('/new')
  .get(roleController.newRole); // GET /roles/new

router
  // Métodos que selecionam o role pela Pk id
  .route('/:id')
  .patch(roleController.updateRole) // PATCH /roles/:id
  .delete(roleController.deleteRole); // DELETE /roles/:id

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
