var express = require('express');
var router = express.Router();

// Referencia o arquivo do Controller
const projectController = require('./../controllers/projectController');

// Envia o tipo de requisição do Router para o Controller
router
  .route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router.route('/new').get(projectController.newProject);

// Métodos que selecionam o project pela Pk id
router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
