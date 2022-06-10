const Assignment = require('../models').Assignment;
const Role = require('../models').Role;
const Employee = require('../models').Employee;

const MONTHS = require('../public/javascripts/months');

exports.getTable = async (req, res) => {
  const roles = await Role.findAll({
    include: [
      {
        model: Employee,
        include: [
          {
            model: Assignment,
          },
        ],
      },
    ],
  });

  res.render('pages/dashboard/table', { roles });
};

exports.getChart = async (req, res) => {
  const assignments = await Assignment.findAll();
  const employees = await Employee.findAll({ include: [Role] });

  // Computar horas disponíveis de todos os funcionários
  const getWorkload = (employee) => {
    if (employee.customWorkload) {
      return employee.customWorkload;
    } else {
      return employee.Role.defaultWorkload;
    }
  };

  const totalEmployeeHours = employees.reduce(
    (acc, employee) => acc + getWorkload(employee),
    0
  );

  const totalInternalEmployeeHours = employees
    .filter((employee) => !employee.isOutsourced)
    .reduce((acc, employee) => acc + getWorkload(employee), 0);

  const assignmentHours = [];
  const requiredCapacityHours = [];
  const employeeHours = [];
  const internalEmployeeHours = [];

  MONTHS.forEach((_, index) => {
    // Computar horas de todas as alocações, mês a mês
    assignmentHours.push(
      assignments
        .filter((assignment) => assignment.month === index)
        .reduce((acc, assignment) => acc + assignment.workHours, 0)
    );

    employeeHours.push(totalEmployeeHours);
    internalEmployeeHours.push(totalInternalEmployeeHours);
  });

  // Computar horas necessárias (capacity) para atender a carga de trabalho
  const requiredCapacity = Math.max(...assignmentHours);
  assignmentHours.forEach((_) => requiredCapacityHours.push(requiredCapacity));

  res.render('pages/dashboard/chart', {
    assignments,
    MONTHS,
    assignmentHours,
    employeeHours,
    internalEmployeeHours,
    requiredCapacityHours,
  });
};
