const dayjs = require('dayjs');
const { MONTHS } = require('../public/javascripts/months');

const Project = require('../models').Project;
const Assignment = require('../models').Assignment;
const Employee = require('../models').Employee;
const Department = require('../models').Department;
const Location = require('../models').Location;

exports.getAllProjects = async (req, res) => {
  const projects = await Project.findAll({ include: [{ all: true }] });
  res.render('pages/project/index', { projects, dayjs });
};

exports.newProject = async (req, res) => {
  res.render('pages/project/new');
};

exports.createProject = async (req, res) => {
  await Project.create(req.body);
  res.send('Projeto cadastrado com sucesso!');
};

exports.getProject = async (req, res) => {
  const project = await Project.findByPk(req.params.id, {
    include: [Department, Location],
  });

  if (project) {
    const assignments = await Assignment.findAll({
      where: { projectId: req.params.id },
      order: [
        ['Employee', 'name', 'ASC'],
        ['year', 'ASC'],
        ['month', 'ASC'],
      ],
      include: [Employee],
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
    });
  } else {
    res.status(404).send('Projeto não encontrado!');
  }
};

exports.updateProject = async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (project) {
    await project.update(req.body);
    res.send('Projeto atualizado com sucesso!');
  } else {
    res.status(404).send('Projeto não encontrado!');
  }
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (project) {
    await project.destroy();
    res.send('Projeto excluído com sucesso!');
  } else {
    res.status(404).send('Projeto não encontrado!');
  }
};
