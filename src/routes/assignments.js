var express = require('express');
var router = express.Router();

const assignmentController = require('./../controllers/assignmentController');

router.route('/').post(assignmentController.createAssignment);

router
  .route('/:id')
  .patch(assignmentController.updateAssignment)
  .delete(assignmentController.deleteAssignment);

module.exports = router;
