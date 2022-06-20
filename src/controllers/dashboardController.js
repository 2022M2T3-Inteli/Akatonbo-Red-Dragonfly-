// Importa os models necessários
const Assignment = require('../models').Assignment;
const Role = require('../models').Role;
const Employee = require('../models').Employee;

// Arquivo contendo os nomes dos meses
const MONTHS = require('../public/javascripts/months');

// Método que renderiza uma página HTML com a tabela do dashboard
exports.getTable = async (req, res) => {
  // Obter o ano que está sendo exibido
  const year = req.query.year || new Date().getFullYear();

  // Obter todas as funções no banco de dados, com os respectivos funcionários e alocações
  const roles = await Role.findAll({
    include: [
      {
        model: Employee,
        include: [
          {
            model: Assignment,
            where: {
              year, // aplicar um filtro para obter apenas as alocações do ano atual
            },
          },
        ],
      },
    ],
  });

  // Renderizar a página com a tabela
  res.render('pages/dashboard/table', { roles, year });
};

// Método que retorna uma página HTML com o gráfico do dashboard
exports.getChart = async (req, res) => {
  // Obter o ano que está sendo exibido
  const year = req.query.year || new Date().getFullYear();

  // Obter todas as alocações no banco de dados, filtradas pelo ano selecionado
  const assignments = await Assignment.findAll({ where: { year } });
  // Obter todos os funcionários no banco de dados, com os respectivos cargos
  const employees = await Employee.findAll({ include: [Role] });

  // Essa função auxiliar verifica se o usuário tem um carga horária customizada definida
  // Se ele não tiver, retorna a carga horária padrão do cargo
  const getWorkload = (employee) => {
    if (employee.customWorkload) {
      return employee.customWorkload;
    } else {
      return employee.Role.defaultWorkload;
    }
  };

  // Essa função soma as horas disponíveis para projeto de todos os funcionários (internos e externos)
  const totalEmployeeHours = employees.reduce(
    (acc, employee) => acc + getWorkload(employee),
    0
  );

  // Essa função todas as horas disponíveis para projetos apenas dos funcionários internos
  const totalInternalEmployeeHours = employees
    .filter((employee) => !employee.isOutsourced)
    .reduce((acc, employee) => acc + getWorkload(employee), 0);

  const assignmentHours = []; // Array que armazenará as horas alocadas, mapeadas por mês (horas alocadas)
  const employeeHours = []; // Array que armazenará as horas disponíveis de todos os funcionários (internos e externos), mês a mês (horas disponíveis)
  const internalEmployeeHours = []; // Array que armazenará as horas disponíveis dos funcionários internos, mês a mês (horas disponíveis internos)
  const requiredCapacityHours = []; // Array que armazenará as horas necessárias para cada mês (horas necessárias)

  // Iterar sobre todos os meses, de janeiro (0) a dezembro (11)
  MONTHS.forEach((_, index) => {
    // Computar horas de todas as alocações existentes, mês a mês e encaixar no array de horas alocadas
    assignmentHours.push(
      assignments
        .filter((assignment) => assignment.month === index) // Filtrar as alocações do mês atual
        .reduce((acc, assignment) => acc + assignment.workHours, 0) // Somar as horas alocadas
    );

    // Computar as horas disponíveis para projetos de todos os funcionários (internos e externos), para aquele mês e encaixar no array de horas disponíveis
    employeeHours.push(totalEmployeeHours);

    // Computar as horas disponíveis para projetos dos funcionário internos, para aquele mês e encaixar no array de horas disponíveis internos
    internalEmployeeHours.push(totalInternalEmployeeHours);
  });

  // Computar horas necessárias (capacity) para atender à carga de trabalho e encaixar no array de horas necessárias
  const requiredCapacity = Math.max(...assignmentHours);
  assignmentHours.forEach(() => requiredCapacityHours.push(requiredCapacity));

  // Renderizar a página com o gráfico
  res.render('pages/dashboard/chart', {
    assignments,
    MONTHS,
    assignmentHours,
    employeeHours,
    internalEmployeeHours,
    requiredCapacityHours,
    year,
  });
};
