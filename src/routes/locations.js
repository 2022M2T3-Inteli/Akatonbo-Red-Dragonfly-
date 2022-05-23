var express = require('express');
var router = express.Router();

const locationController = require('../controllers/locationController');

router.route('/').post(locationController.createLocation);

router
  .route('/:id')
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);

module.exports = router;
