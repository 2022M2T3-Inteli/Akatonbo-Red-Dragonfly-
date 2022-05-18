exports.getAllRoles = (req, res) => {
  res.render('pages/role');
};

exports.createRole = (req, res) => {
  res.render('pages/role/new');
};

exports.updateRole = (req, res) => {
  res.render('pages/role/edit');
};

exports.deleteRole = (req, res) => {
  res.render('pages/role/profile');
};
