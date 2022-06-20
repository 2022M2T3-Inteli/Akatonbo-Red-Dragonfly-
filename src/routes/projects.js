var express = require('express');
var router = express.Router();

// Referencia o arquivo do Controller
const projectController = require('./../controllers/projectController');

// Encaminha a requisição para o método adequado do Controller
/* Formato:
  route('/caminho da rota').tipoDeRequisição(arquivoController.método)
*/

router
  .route('/')
  .get(projectController.getAllProjects) // GET /projects
  .post(projectController.createProject); // POST /projects

router.route('/new').get(projectController.newProject); // GET /projects/new

// Métodos que selecionam o project pela Pk id
router
  .route('/:id')
  .get(projectController.getProject) // GET /projects/:id
  .patch(projectController.updateProject) // PATCH /projects/:id
  .delete(projectController.deleteProject); // DELETE /projects/:id

router.route('/:id/edit/').get(projectController.editProject); // GET /projects/edit/:id

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
