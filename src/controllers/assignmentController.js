const Assignment = require('../models/assignment');

exports.createAssignment = async (req, res) => {
  await Assignment.create(req.body);
  res.send('Alocação criada com sucesso!');
};

exports.updateAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);

  if (assignment) {
    await assignment.update(req.body);
    res.send('Alocação atualizada com sucesso!');
  } else {
    res.status(404).send('Alocação não encontrada!');
  }
};

exports.deleteAssignment = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);

  if (assignment) {
    await assignment.destroy();
    res.send('Alocação excluída com sucesso!');
  } else {
    res.status(404).send('Alocação não encontrada!');
  }
};
