var express = require('express');
var router = express.Router();

// Referencia o arquivo do Controller 
const departmentController = require('../controllers/departmentController');


router
// Define o endpoint dos métodos
  .route('/')
  // Leva ao método referente no arquivo Controller
  .post(departmentController.createDepartment);

router
  .route('/:id')
  .patch(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
