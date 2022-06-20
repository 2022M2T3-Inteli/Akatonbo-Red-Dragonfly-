const { Op } = require('sequelize'); // operador do sequelize, necessário para o filtro de busca

// Importa os models necessários
const Employee = require('../models').Employee;
const Department = require('../models').Department;
const Location = require('../models').Location;
const Role = require('../models').Role;

// Esse método retorna todos os funcionários, com os filtros aplicados, se existentes
exports.getAllEmployees = async (req, res) => {
  // Parâmetros da query string, usados para o filtro ou notificação
  const {
    name,
    departmentId,
    locationId,
    isOutsourced,
    showToast,
    toastColor,
    toastMessage,
  } = req.query;

  // Parametros da query string, usados para filtrar as horas alocadas e disponíveis por mês e ano
  let month, year;
  if (req.query.month) {
    month = parseInt(req.query.month);
  } else {
    month = new Date().getMonth(); // se não houver uma query string, use o mês atual
  }
  if (req.query.year) {
    year = parseInt(req.query.year);
  } else {
    year = new Date().getFullYear(); // se não houver uma query string, use o ano atual
  }

  // Construir a query de filtro para o banco de dados, usando o Sequelize
  const whereStatement = {};
  if (name) whereStatement.name = { [Op.like]: `%${name}%` };
  if (departmentId) whereStatement.departmentId = parseInt(departmentId);
  if (locationId) whereStatement.locationId = parseInt(locationId);
  if (isOutsourced) whereStatement.isOutsourced = !!parseInt(isOutsourced);

  // Buscar todos os funcionários, aplicando a query de filtro
  const employees = await Employee.findAll({
    where: whereStatement,
    include: [{ all: true }],
  });

  // Buscar todos os departamentos e locais no banco de dados
  // para usar nos campos select do formulário de filtro
  const departments = await Department.findAll();
  const locations = await Location.findAll();

  res.render('pages/employee/index', {
    employees,
    departments,
    locations,
    month,
    year,
    name,
    departmentId,
    locationId,
    isOutsourced,
    showToast,
    toastMessage,
    toastColor,
  });
};

// Método para renderizar o perfil de um funcionário
exports.getEmployee = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id, {
    include: [Department, Location, Role],
  });

  if (employee) {
    res.render('pages/employee/profile', { employee });
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
};

// Método para renderizar o formulário HTML de criação de um novo funcionário
exports.newEmployee = async (req, res) => {
  const { showToast, toastColor, toastMessage } = req.query;

  const departments = await Department.findAll();
  const locations = await Location.findAll();
  const roles = await Role.findAll();
  res.render('pages/employee/new', {
    departments,
    locations,
    roles,
    showToast,
    toastMessage,
    toastColor,
  });
};

// Método para criar um novo funcionário no banco de dados
exports.createEmployee = async (req, res) => {
  try {
    await Employee.create(req.body);

    // Redirecionar para a lista de funcionários
    res.redirect(
      '/employees?showToast=true&toastMessage=Funcionário criado com sucesso!&toastColor=success'
    );
  } catch (err) {
    // Se ocorrer um erro, renderizar o formulário de criação novamente
    res.redirect(
      `/employees/new?showToast=true&toastMessage=${err.message}&toastColor=danger`
    );
  }
};


// Método para renderizar o formulário HTML de edição de um funcionário
exports.editEmployee = async (req, res) => {
  // Buscar o funcionário pelo id
  const employee = await Employee.findByPk(req.params.id, {
    include: [Department, Location, Role],
  });

  // verificar se o funcionário existe
  if (employee) {
    // Buscar todos os departamentos, locais e funções no banco de dados para o formulário de edição
    const departments = await Department.findAll();
    const locations = await Location.findAll();
    const roles = await Role.findAll();

    // Renderizar o formulário de edição
    res.render('pages/employee/edit', {
      employee,
      departments,
      locations,
      roles,
    });
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
}

// Método para atualizar um funcionário no banco de dados
exports.updateEmployee = async (req, res) => {
  // Buscar o funcionário pelo id
  const employee = await Employee.findByPk(req.params.id);

  if (employee) {
    try {
      await employee.update(req.body);
      res.redirect(
        '/employees?showToast=true&toastMessage=Funcionário atualizado com sucesso!&toastColor=success'
      );
    } catch (err) {
      res.redirect(
        `/employees/${req.params.id}/edit?showToast=true&toastMessage=${err.message}&toastColor=danger`
      );
    }
  } else {
    res.status(404).send('Funcionário não encontrado!');
  }
};

// Método para excluir um funcionário do banco de dados
exports.deleteEmployee = async (req, res) => {
  // Buscar o funcionário pelo id
  const employee = await Employee.findByPk(req.params.id);

  if (employee) {
    // Excluir o funcionário
    await employee.destroy();
    // Redirecionar para a lista de funcionários
    res.redirect(
      '/employees?showToast=true&toastMessage=Funcionário excluído com sucesso!&toastColor=success'
    );
  } else {
    // Se o funcionário não existir, exibir um erro
    res.status(404).send('Funcionário não encontrado!');
  }
};
