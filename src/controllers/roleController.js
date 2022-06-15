// Importa o index.js do Model gerado automaticamente pelo Sequelize
const Role = require('../models').Role;

// Exporta o método de requisição para ser referenciado pelo Router
exports.getAllRoles = async (req, res) => {
  // Usa sequelize para achar todos os roles no BD
  const roles = await Role.findAll();
  // Manda resposta para o front
  res.render('pages/role/index', { roles });
};

exports.newRole = async (req, res) => {
  // Acessa o form html para criar o novo role
  res.render('pages/role/new');
};

exports.createRole = async (req, res) => {
  // Testa se todos os requisitos do BD foram atendidos
  try {
    // Executa a requisição de crate acessando o Model (BD)
    console.log(req.body);
    await Role.create(req.body);
    res.redirect('/roles');
  } catch (err) {
    res.send(err.errors[0].message);
  }
};

exports.updateRole = async (req, res) => {
  // Seleciona o Role requisitado pelo usuário pelo PK (Primary Key)
  const role = await Role.findByPk(req.params.id);

  if (role) {
    // Executa a requisição update do role selecionado
    try {
      await role.update(req.body);
      res.send('Função atualizada com sucesso!');
    } catch (err) {
      res.send(err.errors[0].message);
    }
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
