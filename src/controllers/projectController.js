exports.getAllProjects = (req, res) => {
  res.render('pages/project');
};

exports.createProject = (req, res) => {
  res.render('pages/project/new');
};

exports.getProject = (req, res) => {
  res.render('pages/project/show');
};

exports.updateProject = (req, res) => {
  res.render('pages/project/edit');
};

exports.deleteProject = (req, res) => {
  res.render('pages/project/profile');
};
