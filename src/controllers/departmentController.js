// Importa o index.js do Model gerado automaticamente pelo Sequelize
const Department = require('../models').Department;

// Exporta o método de requisição para ser referenciado pelo Router
exports.createDepartment = async (req, res) => {
  // Usa sequelize para usar o método POST par criar um novo departamento
  try {
    await Department.create(req.body);
    res.send('Departamento criado com sucesso!');
  } catch (err) {
    res.send(err.errors[0].message);
  }
};

exports.updateDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  // Se conseguir achar o departamento pela Pk, executa o método PATCH
  if (department) {
    try {
      await department.update(req.body);
      res.send('Departamento atualizado com sucesso!');
    } catch (err) {
      res.send(err.errors[0].message);
    }
  } else {
    res.status(404).send('Departamento não encontrado!');
  }
};

exports.deleteDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  // Se conseguir achar o departamento pela Pk, executa o método DELETE
  if (department) {
    await department.destroy();
    res.send('Departamento excluído com sucesso!');
  } else {
    res.status(404).send('Departamento não encontrado!');
  }
};
