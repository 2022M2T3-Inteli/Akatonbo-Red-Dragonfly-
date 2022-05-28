const Department = require('../models').Department;

exports.createDepartment = async (req, res) => {
  await Department.create(req.body);
  res.send('Departamento criado com sucesso!');
};

exports.updateDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);

  if (department) {
    await department.update(req.body);
    res.send('Departamento atualizado com sucesso!');
  } else {
    res.status(404).send('Departamento não encontrado!');
  }
};

exports.deleteDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);

  if (department) {
    await department.destroy();
    res.send('Departamento excluído com sucesso!');
  } else {
    res.status(404).send('Departamento não encontrado!');
  }
};
