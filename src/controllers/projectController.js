// Importa o Index.js do daysjs, biblioteca usada para operar com datas
const dayjs = require('dayjs');
// Importa os meses do ano
const MONTHS = require('../public/javascripts/months');

const Project = require('../models').Project;
const Assignment = require('../models').Assignment;
const Employee = require('../models').Employee;
const Department = require('../models').Department;
const Location = require('../models').Location;
const Role = require('../models').Role;

// Método que renderiza a view de listagem de projetos(todos)
exports.getAllProjects = async (req, res) => {
  // Carrega todos os projetos do banco de dados
  const projects = await Project.findAll({ include: [Department, Location] });
  const departments = await Department.findAll();
  const locations = await Location.findAll();

  // Renderiza a view com os dados do projeto
  res.render('pages/project/index', {
    projects,
    dayjs,
    departments,
    locations,
    showToast: req.query.showToast,
    toastMessage: req.query.toastMessage,
    toastColor: req.query.toastColor,
  });
};

// Método que renderiza a view de cadastro de projeto
exports.newProject = async (req, res) => {
  // Carrega todos os departamentos do banco de dados
  const departments = await Department.findAll();
  // Carrega todos os locais do banco de dados
  const locations = await Location.findAll();

  res.render('pages/project/new', {
    // Passa os dados do projeto para a view
    departments,
    locations,
    showToast: req.query.showToast,
    toastMessage: req.query.toastMessage,
    toastColor: req.query.toastColor,
  });
};

// Método que salva o projeto no banco de dados
exports.createProject = async (req, res) => {
  try {
    await Project.create(req.body);

    res.redirect(
      '/projects?showToast=true&toastMessage=Projeto criado com sucesso!&toastColor=success'
    );
  } catch (err) {
    res.redirect(
      `/projects/new?showToast=true&toastMessage=${err.errors[0].message}&toastColor=danger`
    );
  }
};

exports.getProject = async (req, res) => {
  // Seleciona o projeto requisitado pelo usuário pelo PK (Primary Key)
  const project = await Project.findByPk(req.params.id, {
    //
    include: [Department, Location],
  });
  // Se o projeto existir, exibe o projeto
  if (project) {
    const assignments = await Assignment.findAll({
      // Seleciona todas as atribuições do projeto
      where: { projectId: req.params.id },
      // Seleciona todos os empregados do projeto
      order: [
        ['Employee', 'name', 'ASC'],
        ['year', 'ASC'],
        ['month', 'ASC'],
      ],
      include: { model: Employee, include: [Role] },
    });

    // Calcular horas totais do projeto
    const projectHours = assignments.reduce((acc, curr) => {
      return acc + curr.workHours;
    }, 0);
    res.render('pages/project/profile', {
      project,
      assignments,
      projectHours,
      dayjs,
      MONTHS,
      showToast: req.query.showToast,
      toastMessage: req.query.toastMessage,
      toastColor: req.query.toastColor,
    });
  } else {
    res.status(404).send('Projeto não encontrado!');
  }
};

exports.updateProject = async (req, res) => {
  // Seleciona o projeto requisitado pelo usuário pelo PK (Primary Key)
  const project = await Project.findByPk(req.params.id);

  if (project) {
    // Executa a requisição update do projeto selecionado
    try {
      await project.update(req.body);
      res.send('Projeto atualizado com sucesso!');
    } catch (err) {
      // Se ocorrer um erro, exibe o erro
      res.send(err.errors[0].message);
    }
  } else {
    // Se o projeto não existir, exibe um erro
    res.status(404).send('Projeto não encontrado!');
  }
};

exports.deleteProject = async (req, res) => {
  // Seleciona o projeto requisitado pelo usuário pelo PK (Primary Key)
  const project = await Project.findByPk(req.params.id);
  // Se o projeto existir, exclui o projeto
  if (project) {
    await project.destroy();
    res.send('Projeto excluído com sucesso!');
  } else {
    // Se o projeto não existir, exibe um erro
    res.status(404).send('Projeto não encontrado!');
  }
};
