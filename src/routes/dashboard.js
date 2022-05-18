var express = require('express');
var router = express.Router();

const dashboardController = require('./../controllers/dashboardController');

router.route('/table').get(dashboardController.getTable);

router.route('/chart').get(dashboardController.getChart);

module.exports = router;
