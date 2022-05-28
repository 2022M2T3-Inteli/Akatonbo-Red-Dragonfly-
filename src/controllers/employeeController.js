const Employee = require('../models').Employee;

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.findAll({ include: [{ all: true }] });
  res.render('pages/employee/index', { employees });
};

exports.createEmployee = async (req, res) => {
  await Employee.create(req.body);
  res.send('Funcionário cadastrado com sucesso!');
};

exports.getEmployee = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);

  if (employee) {
    res.render('pages/employee/profile', { employee });
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
};

exports.updateEmployee = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);

  if (employee) {
    await employee.update(req.body);
    res.send('Funcionário atualizado com sucesso!');
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
};

exports.deleteEmployee = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);

  if (employee) {
    await employee.destroy();
    res.send('Funcionário excluído com sucesso!');
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
};
