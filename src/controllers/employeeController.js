const Employee = require('../models/employee');

exports.getAllEmployees = (req, res) => {
  res.render('pages/employee');
};

exports.createEmployee = (req, res) => {
  Employee.create(req.body).then(() => {
    res.send('Funcionário cadastrado com sucesso!');
  });
};

exports.getEmployee = (req, res) => {
  res.render('pages/employee/show');
};

exports.updateEmployee = (req, res) => {
  res.render('pages/employee/edit');
};

exports.deleteEmployee = (req, res) => {
  res.render('pages/employee/profile');
};
