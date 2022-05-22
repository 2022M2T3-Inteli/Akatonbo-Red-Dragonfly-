const Role = require('../models/role');

exports.getAllRoles = async (req, res) => {
  const roles = await Role.findAll();
  res.render('pages/role/index', { roles });
};

exports.createRole = async (req, res) => {
  await Role.create(req.body);
  res.send('Função cadastrada com sucesso!');
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
