const Assignment = require('../models').Assignment;
const Employee = require('../models').Employee;
const Project = require('../models').Project;

exports.createAssignment = async (req, res) => {
  // verificar se o projeto existe
  const project = await Project.findByPk(req.body.projectId);
  // verificar se o funcionario existe
  const employee = await Employee.findByPk(req.body.employeeId);
  if (project && employee) {
    await Assignment.create(req.body);
    res.send('Alocação cadastrada com sucesso!');
  } else {
    res.status(404).send('Projeto ou funcionário não encontrado!');
  }
};

exports.updateAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);

  // verificar se o projeto existe
  if (req.body.projectId) {
    const project = await Project.findByPk(req.body.projectId);
    if (!project) {
      res.status(404).send('Projeto não encontrado!');
      return;
    }
  }
  // verificar se o funcionario existe
  if (req.body.employeeId) {
    const employee = await Employee.findByPk(req.body.employeeId);
    if (!employee) {
      res.status(404).send('Funcionário não encontrado!');
      return;
    }
  }

  if (assignment) {
    await assignment.update(req.body);
    res.send('Alocação atualizada com sucesso!');
  } else {
    res.status(404).send('Alocação, projeto ou funcionário não encontrado!');
  }
};

exports.deleteAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);

  if (assignment) {
    await assignment.destroy();
    res.send('Alocação excluída com sucesso!');
  } else {
    res.status(404).send('Alocação não encontrada!');
  }
};
