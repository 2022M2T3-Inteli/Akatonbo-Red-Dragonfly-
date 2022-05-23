const Location = require('../models/location');

exports.createLocation = async (req, res) => {
  await Location.create(req.body);
  res.send('Localização criada com sucesso!');
};

exports.updateLocation = async (req, res) => {
  const location = await Location.findByPk(req.params.id);

  if (location) {
    await location.update(req.body);
    res.send('Localização atualizada com sucesso!');
  } else {
    res.status(404).send('Localização não encontrada!');
  }
};

exports.deleteLocation = async (req, res) => {
  const location = await Location.findByPk(req.params.id);

  if (location) {
    await location.destroy();
    res.send('Localização excluída com sucesso!');
  } else {
    res.status(404).send('Localização não encontrada!');
  }
};
