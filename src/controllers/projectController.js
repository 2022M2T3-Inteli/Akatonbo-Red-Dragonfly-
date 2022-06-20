// Importa o Index.js do daysjs, biblioteca usada para operar com datas
const dayjs = require('dayjs');
// Importa os meses do ano
const MONTHS = require('../public/javascripts/months');

// Importa os models necessários
const Project = require('../models').Project;
const Assignment = require('../models').Assignment;
const Employee = require('../models').Employee;
const Department = require('../models').Department;
const Location = require('../models').Location;
const Role = require('../models').Role;

// Método que renderiza a view de listagem de todos os projetos
exports.getAllProjects = async (req, res) => {
  // Carrega todos os projetos do banco de dados
  const projects = await Project.findAll({ include: [Department, Location] });
  // Carrega todos os departamentos do banco de dados
  const departments = await Department.findAll();
  // Carrega todos os locais do banco de dados
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

// Método que renderiza um form HTML para cadastro de projeto
exports.newProject = async (req, res) => {
  // Carrega todos os departamentos do banco de dados para mostrar no formulário
  const departments = await Department.findAll();
  // Carrega todos os locais do banco de dados para mostrar no formulário
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
      `/projects/new?showToast=true&toastMessage=${err.message}&toastColor=danger`
    );
  }
};

// Método que renderiza uma página HTML com o perfil de um projeto
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

// Método que renderiza um formulário HTML para editar os dados de um projeto
exports.editProject = async (req, res) => {
  // Carrega todos os departamentos do banco de dados para mostrar no formulário
  const departments = await Department.findAll();

  // Carrega todos os locais do banco de dados para mostrar no formulário
  const locations = await Location.findAll();

  // Seleciona o projeto a ser editado pelo usuário pelo PK (Primary Key)
  const project = await Project.findByPk(req.params.id, {
    include: [Department, Location],
  });

  // Verifica se o projeto existe
  if (project) {
    // Retorna um formulário HTML com os dados do projeto existente
    res.render('pages/project/edit', {
      project,
      locations,
      departments,
      showToast: req.query.showToast,
      toastMessage: req.query.toastMessage,
      toastColor: req.query.toastColor,
    });
  } else {
    // Se o projeto não existir, exibe um erro
    res.status(404).send('Projeto não encontrado!');
  }
};

// Método que atualiza os dados do projeto no banco de dados
exports.updateProject = async (req, res) => {
  // Seleciona o projeto requisitado pelo usuário pelo PK (Primary Key)
  const project = await Project.findByPk(req.body.id);
  console.log(project);
  // Verifica se o projeto existe
  if (project) {
    try {
      // Atualiza o projeto selecionado no banco de dados
      await project.update(req.body);
      // Redireciona para a listagem de projetos
      res.redirect(
        `/projects/${req.params.id}?showToast=true&toastMessage=Projeto atualizado com sucesso!&toastColor=success`
      );
    } catch (err) {
      // Se houver um erro, redireciona para o formulário de edição do projeto
      res.redirect(
        `/projects/${req.params.id}/edit?showToast=true&toastMessage=${err.message}&toastColor=danger`
      );
    }
  } else {
    // Se o projeto não existir, exibe um erro
    res.status(404).send('Projeto não encontrado!');
  }
};

// Método que exclui um projeto do banco de dados
exports.deleteProject = async (req, res) => {
  // Seleciona o projeto requisitado pelo usuário pelo PK (Primary Key)
  const project = await Project.findByPk(req.params.id);
  // Se o projeto existir, exclui o projeto
  if (project) {
    await project.destroy();
    res.redirect(
      '/projects?showToast=true&toastMessage=Projeto excluído com sucesso!&toastColor=success'
    );
  } else {
    // Se o projeto não existir, exibe um erro
    res.status(404).send('Projeto não encontrado!');
  }
};
