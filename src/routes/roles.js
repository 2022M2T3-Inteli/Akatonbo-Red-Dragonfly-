var express = require('express');
var router = express.Router();

const roleController = require('./../controllers/roleController');

router
  .route('/')
  .get(roleController.getAllRoles)
  .post(roleController.createRole);

router
.route('/new').get(roleController.newRole);

router
  .route('/:id')
  .patch(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = router;
