// Importa o day.js para formatar datas
const dayjs = require('dayjs')

// Importa o arquivo de meses a serem referenciados
const MONTHS = require('../public/javascripts/months');

// Importa os Models do banco de dados gerados pelo Sequelize
const Assignment = require('../models').Assignment;
const Employee = require('../models').Employee;
const Project = require('../models').Project;
const Role = require('../models').Role;

// Método que retorna um formulário HTML para o cadastro de uma nova alocação
exports.newAssignment = async (req, res) => {
  // Buscar o projeto pelo ID passado na URL
  const project = await Project.findByPk(req.params.id);
  // Retorna um erro se o projeto não existir
  if (!project) {
    return res.status(404).send('Projeto não encontrado');
  }

  // Buscar todos os funcionários para exibir no formulário
  const employees = await Employee.findAll({
    include: [Role],
  });

  // Retorna a página com o form para a criação de alocações
  res.render(`pages/assignment/new`, {
    employees,
    project,
    MONTHS,
    dayjs,
    showToast: req.query.showToast,
    toastMessage: req.query.toastMessage,
    toastColor: req.query.toastColor,
  });
};

// Método que recebe os dados do formulário de cadastro de alocação e salva no banco de dados
exports.createAssignment = async (req, res) => {
  // verificar se o projeto existe e retornar um erro se não existir
  const project = await Project.findByPk(req.body.projectId);
  if (!project) {
    res.status(404).send('Projeto não encontrado!');
    return;
  }
  // verificar se o funcionario existe e retornar um erro se não existir
  const employee = await Employee.findByPk(req.body.employeeId);
  if (!employee) {
    res.status(404).send('Funcionário não encontrado!');
    return;
  }

  // se tudo estiver certo, tentar criar uma nova alocação
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

        // se uma alocação já existe para aquele projeto/mês/ano...
        if (!created) {
          // ...adicionar as horas na alocação existente
          workHours = parseInt(assignment.workHours) + parseInt(workHours);
          await assignment.update({ workHours });
        }
      }
    }

    res.redirect(
      `/projects/${req.body.projectId}?showToast=true&toastMessage=Alocação(ões) criada(s) com sucesso!&toastColor=success`
    );
  } catch (err) {
    res.redirect(
      `/assignments/new/${req.body.projectId}?showToast=true&toastMessage=${err.message}&toastColor=danger`
    );
  }
};

// Método que atualiza uma alocação no banco de dados
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

// Método que deleta uma alocação do banco de dados
exports.deleteAssignment = async (req, res) => {
  // Obter a alocação no banco de dados pelo ID passado na URL
  const assignment = await Assignment.findByPk(req.params.id);

  // verificar se a alocação existe
  if (assignment) {
    // se a alocação existir, excluir
    await assignment.destroy();
    // Redirecionar para a página do projeto com uma notificação de sucesso
    res.redirect(
      `/projects/${assignment.projectId}?showToast=true&toastMessage=Alocação excluída com sucesso!&toastColor=success`
    );
  } else {
    // se não existir, retornar um erro
    res.status(404).send('Alocação não encontrada!');
  }
};
