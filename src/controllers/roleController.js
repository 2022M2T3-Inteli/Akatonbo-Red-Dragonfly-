const Role = require('../models').Role;

exports.getAllRoles = async (req, res) => {
  const roles = await Role.findAll();
  res.render('pages/role/index', { roles });
};

exports.newRole = async (req, res) => {
  res.render('pages/role/new');
};

exports.createRole = async (req, res) => {
  try {
    await Role.create(req.body);
    res.send('Função cadastrada com sucesso!');
  } catch {
    res.send('Erro no cadastro da função!');
  }
};

exports.updateRole = async (req, res) => {
  const role = await Role.findByPk(req.params.id);

  if (role) {
    await role.update(req.body);
    res.send('Função atualizada com sucesso!');
  } else {
    res.status(404).send('Função não encontrada!');
  }
};

exports.deleteRole = async (req, res) => {
  const role = await Role.findByPk(req.params.id);

  if (role) {
    await role.destroy();
    res.send('Função excluída com sucesso!');
  } else {
    res.status(404).send('Função não encontrada!');
  }
};
