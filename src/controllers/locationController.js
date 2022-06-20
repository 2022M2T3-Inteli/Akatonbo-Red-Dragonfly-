// Importa o index.js dos Models gerado automaticamente pelo Sequelize
const Location = require('../models').Location;

// Método que cria uma nova localização no banco de dados
exports.createLocation = async (req, res) => {
  // Executa o método POST utilizando Sequelize
  await Location.create(req.body);
  res.send('Localização criada com sucesso!');
};

// Método que atualiza uma localização no banco de dados
exports.updateLocation = async (req, res) => {
  const location = await Location.findByPk(req.params.id);
  //  Executa o método PATCH se conseguir achar a location pela Pk trazida pela requisição
  if (location) {
    await location.update(req.body);
    res.send('Localização atualizada com sucesso!');
  } else {
    res.status(404).send('Localização não encontrada!');
  }
};

// Método que exclui uma localização do banco de dados
exports.deleteLocation = async (req, res) => {
  const location = await Location.findByPk(req.params.id);
  // Executa o método DELETE se conseguir achar a localização pela Pk
  if (location) {
    await location.destroy();
    res.send('Localização excluída com sucesso!');
  } else {
    res.status(404).send('Localização não encontrada!');
  }
};
