var express = require('express');
var router = express.Router();

// Referencia o arquivo do Controller
const locationController = require('../controllers/locationController');

// Envia o tipo de requisição do Router para o Controller
router
  .route('/')
  .post(locationController.createLocation);

router
  // Métodos que selecionam a location pela Pk id
  .route('/:id')
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);

module.exports = router;
