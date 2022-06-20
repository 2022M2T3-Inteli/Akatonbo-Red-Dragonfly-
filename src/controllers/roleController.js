// Importa o index.js do Model gerado automaticamente pelo Sequelize
const Role = require('../models').Role;

// Método que renderiza uma página HTML listando todas as funções dos funcionários
exports.getAllRoles = async (req, res) => {
  // Usa sequelize para achar todos os roles no BD
  const roles = await Role.findAll();
  // Manda resposta para o front
  res.render('pages/role/index', {
    roles,
    showToast: req.query.showToast,
    toastMessage: req.query.toastMessage,
    toastColor: req.query.toastColor,
  });
};

// Método que renderiza um form HTML para cadastro de uma nova função
exports.newRole = async (req, res) => {
  // Acessa o form html para criar o novo role
  res.render('pages/role/new', {
    showToast: req.query.showToast,
    toastMessage: req.query.toastMessage,
    toastColor: req.query.toastColor,
  });
};

// Método que salva a função no banco de dados
exports.createRole = async (req, res) => {
  // Testa se todos os requisitos do BD foram atendidos
  try {
    // Executa a requisição de crate acessando o Model (BD)
    await Role.create(req.body);
    res.redirect(
      '/roles?showToast=true&toastColor=success&toastMessage=Função criada com sucesso!'
    );
  } catch (err) {
    res.redirect(
      `roles/new?showToast=true&toastColor=danger&toastMessage=${err.errors[0].message}`
    );
  }
};

// Método que atualiza um projeto no banco de dados
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

// Método que exclui um projeto do banco de dados
exports.deleteRole = async (req, res) => {
  const role = await Role.findByPk(req.params.id);

  if (role) {
    await role.destroy();
    res.send('Função excluída com sucesso!');
  } else {
    res.status(404).send('Função não encontrada!');
  }
};
