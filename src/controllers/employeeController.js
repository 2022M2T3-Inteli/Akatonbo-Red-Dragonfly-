const { Op } = require('sequelize');

const Employee = require('../models').Employee;
const Department = require('../models').Department;
const Location = require('../models').Location;
const Role = require('../models').Role;

// Esse método retorna todos os funcionários, com ou sem filtro
exports.getAllEmployees = async (req, res) => {
  // Parâmetros da query string, usados para o filtro ou notificação
  const {
    name,
    departmentId,
    locationId,
    isOutsourced,
    showToast,
    toastColor,
    toastMessage,
  } = req.query;

  let month, year;
  if (req.query.month) {
    month = parseInt(req.query.month);
  } else {
    month = new Date().getMonth();
  }

  if (req.query.year) {
    year = parseInt(req.query.year);
  } else {
    year = new Date().getFullYear();
  }

  const whereStatement = {};
  if (name) whereStatement.name = { [Op.like]: `%${name}%` };
  if (departmentId) whereStatement.departmentId = parseInt(departmentId);
  if (locationId) whereStatement.locationId = parseInt(locationId);
  if (isOutsourced) whereStatement.isOutsourced = !!parseInt(isOutsourced);

  console.log(month);
  console.log(year);
  const employees = await Employee.findAll({
    where: whereStatement,
    include: [{ all: true }],
  });

  const departments = await Department.findAll();
  const locations = await Location.findAll();

  res.render('pages/employee/index', {
    employees,
    departments,
    locations,
    month,
    year,
    name,
    departmentId,
    locationId,
    isOutsourced,
    showToast,
    toastMessage,
    toastColor,
  });
};

exports.newEmployee = async (req, res) => {
  const { showToast, toastColor, toastMessage } = req.query;

  const departments = await Department.findAll();
  const locations = await Location.findAll();
  const roles = await Role.findAll();
  res.render('pages/employee/new', {
    departments,
    locations,
    roles,
    showToast,
    toastMessage,
    toastColor,
  });
};

exports.createEmployee = async (req, res) => {
  try {
    await Employee.create(req.body);

    res.redirect(
      '/employees?showToast=true&toastMessage=Funcionário criado com sucesso!&toastColor=success'
    );
  } catch (err) {
    // encode url
    const errorMessage = err.errors[0].message;

    res.redirect(
      `/employees/new?showToast=true&toastMessage=${errorMessage}&toastColor=danger`
    );
  }
};

exports.getEmployee = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id, {
    include: [Department, Location, Role],
  });

  if (employee) {
    res.render('pages/employee/profile', { employee });
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
};

exports.updateEmployee = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);

  if (employee) {
    try {
      await employee.update(req.body);
      res.send('Funcionário atualizado com sucesso!');
    } catch (err) {
      res.send(err.errors[0].message);
    }
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
};

exports.deleteEmployee = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);

  if (employee) {
    await employee.destroy();
    res.redirect(
      '/employees?showToast=true&toastMessage=Funcionário excluído com sucesso!&toastColor=success'
    );
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
};
