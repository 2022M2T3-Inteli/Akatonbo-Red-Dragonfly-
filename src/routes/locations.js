var express = require('express');
var router = express.Router();

// Importar os métodos do Controller
const locationController = require('../controllers/locationController');

// Encaminha a requisição para o método adequado do Controller
/* Formato:
  route('/caminho da rota').tipoDeRequisição(arquivoController.método)
*/

router
  .route('/') // GET /locations
  .post(locationController.createLocation); // POST /locations

router
  // Métodos que selecionam a location pela Pk id
  .route('/:id')
  .patch(locationController.updateLocation) // PATCH /locations/:id
  .delete(locationController.deleteLocation); // DELETE /locations/:id

// Exporta as rotas para serem utilizadas pelo app.js
module.exports = router;
