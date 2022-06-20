// Importa os models necessários
const Department = require('../models').Department;

// Método para criar um novo departamento no banco de dados
exports.createDepartment = async (req, res) => {
  // Usa sequelize para usar o método POST par criar um novo departamento
  try {
    await Department.create(req.body);
    res.send('Departamento criado com sucesso!');
  } catch (err) {
    res.send(err.message);
  }
};

// Método para atualizar um departamento no banco de dados
exports.updateDepartment = async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  // Se conseguir achar o departamento pela Pk, executa o método PATCH
  if (department) {
    try {
      await department.update(req.body);
      res.send('Departamento atualizado com sucesso!');
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.status(404).send('Departamento não encontrado!');
  }
};

// Método para excluir um departamento do banco de dados
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
