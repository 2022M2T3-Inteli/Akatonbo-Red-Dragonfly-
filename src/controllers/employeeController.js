exports.getAllEmployees = (req, res) => {
  res.render('pages/employee');
};

exports.createEmployee = (req, res) => {
  res.render('pages/employee/new');
};

exports.getEmployee = (req, res) => {
  res.render('pages/employee/show');
};

exports.updateEmployee = (req, res) => {
  res.render('pages/employee/edit');
};

exports.deleteEmployee = (req, res) => {
  res.render('pages/employee/profile');
};
