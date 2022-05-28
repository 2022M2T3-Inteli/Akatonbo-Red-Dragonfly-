const Project = require('../models').Project;

exports.getAllProjects = async (req, res) => {
  const projects = await Project.findAll({ include: [{ all: true }] });
  res.render('pages/project/index', { projects });
};

exports.createProject = async (req, res) => {
  await Project.create(req.body);
  res.send('Projeto cadastrado com sucesso!');
};

exports.getProject = async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (project) {
    res.render('pages/project/profile', { project });
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
