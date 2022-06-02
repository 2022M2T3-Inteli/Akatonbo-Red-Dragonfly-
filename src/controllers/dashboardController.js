const Assignment = require('../models').Assignment;
const Role = require('../models').Role;
const Employee = require('../models').Employee;

exports.getTable = async (req, res) => {
  const roles = await Role.findAll({
    include: [
      {
        model: Employee,
        include: [
          {
            model: Assignment,
          },
        ],
      },
    ],
  });

  res.render('pages/dashboard/table', { roles });
};

exports.getChart = async (req, res) => {
  res.render('pages/dashboard/chart');
};
