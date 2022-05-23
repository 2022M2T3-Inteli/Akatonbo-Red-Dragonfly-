var express = require('express');
var router = express.Router();

const departmentController = require('../controllers/departmentController');

router.route('/').post(departmentController.createDepartment);

router
  .route('/:id')
  .patch(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
