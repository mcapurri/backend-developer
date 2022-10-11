const getEmployeesStatistics = require("./index");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getStatisticsFromDB = async () => {
  employees = await prisma.employee.findMany({
    include: {
      salary: true,
      bank: true,
      crypto: true,
    },
  });
  //   console.dir(employees, { depth: null })
  return employees;
};

let salarySum;
let averageSalary;
let avgSalariesByPosition = {};
let numberEmployees;

getStatisticsFromDB()
  .then((response) => {
    numberEmployees = Object.values(response).length;

    const statistics = getEmployeesStatistics(response);

    salarySum = statistics.salarySum;
    averageSalary = statistics.averageSalary;
    avgSalariesByPosition = statistics.avgSalariesByPosition;
  })
  .catch((e) => {
    console.error(`There was an error while querying: ${e}`);
    process.exit(1);
  });

module.exports = (req, res) => {
  res.status(200);
  res.send({
    number_of_employees: numberEmployees,
    sum_of_paid_salaries: salarySum.toFixed(2),
    average_salary: averageSalary,
    average_salary_by_position: avgSalariesByPosition,
  });
};
