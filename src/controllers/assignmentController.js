const MONTHS = require('../public/javascripts/months');

const Assignment = require('../models').Assignment;
const Employee = require('../models').Employee;
const Project = require('../models').Project;
const Role = require('../models').Role;

exports.newAssignment = async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  const employees = await Employee.findAll({
    include: [Role],
  });

  res.render(`pages/assignment/new`, {
    employees,
    project,
    MONTHS,
  });
};

exports.createAssignment = async (req, res) => {
  // verificar se o projeto existe
  const project = await Project.findByPk(req.body.projectId);
  if (!project) {
    res.status(404).send('Projeto não encontrado!');
    return;
  }
  // verificar se o funcionario existe
  const employee = await Employee.findByPk(req.body.employeeId);
  if (!employee) {
    res.status(404).send('Funcionário não encontrado!');
    return;
  }

  try {
    // verificar se a alocação já existe para aquele funcionário, mês e ano
    // se existir, atualizar, se não, criar
    const [assignment, created] = await Assignment.findOrCreate({
      where: {
        projectId: req.body.projectId,
        employeeId: req.body.employeeId,
        month: req.body.month,
        year: req.body.year,
      },
      defaults: {
        workHours: req.body.workHours,
      },
    });

    if (created) {
      // se a alocação não existe, informar que foi cadastrada
      res.send('Alocação cadastrada com sucesso!');
    } else {
      // se a alocação já existe, adicionar as horas
      workHours = parseInt(assignment.workHours) + parseInt(req.body.workHours);
      await assignment.update({ workHours });
      res.send(
        'Alocação já existente. As horas foram adicionadas com sucesso!'
      );
    }
  } catch (err) {
    res.send(err.errors[0].message);
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
    res.status(404).send('Alocação não encontrada!');
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
