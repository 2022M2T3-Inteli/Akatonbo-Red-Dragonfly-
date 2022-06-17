// Importa o arquivo de meses a serem referenciados
const MONTHS = require('../public/javascripts/months');

// Importa o index.js do Model gerado automaticamente pelo Sequelize
const Assignment = require('../models').Assignment;
const Employee = require('../models').Employee;
const Project = require('../models').Project;
const Role = require('../models').Role;

// Endpoint para um nova alocação
exports.newAssignment = async (req, res) => {
  // Exporta as chaves estrangeiras do funcionário e projeto
  const project = await Project.findByPk(req.params.id);
  const employees = await Employee.findAll({
    include: [Role],
  });

  // Renderiza a página de criação dos funcionários no final da requisição 
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
    // cadastrar uma alocação para cada campo de mês do form que não estiver vazio
    for (let i = 0; i <= MONTHS.length; i++) {
      let workHours = req.body[`workHours[${i}]`];
      // verificar se existe uma entrada de horas no form para aquele mês
      if (workHours) {
        // verificar se a alocação já existe para aquele projeto, funcionário, mês e ano
        // se existir, atualizar a alocação existente, se não, criar uma nova alocação
        const [assignment, created] = await Assignment.findOrCreate({
          where: {
            projectId: req.body.projectId,
            employeeId: req.body.employeeId,
            year: req.body.year,
            month: i,
          },
          defaults: {
            workHours,
          },
        });

        if (!created) {
          // se a alocação já existe, adicionar as horas na alocação existente
          workHours = parseInt(assignment.workHours) + parseInt(workHours);
          await assignment.update({ workHours });
        }
      }
    }

    res.send('Alocação(ões) cadastrada(s) com sucesso!');
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
