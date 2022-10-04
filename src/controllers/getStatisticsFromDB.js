const _ = require("underscore");

const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
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

    salarySum = _.chain(response)
      .reduce((sum, user) => {
        return sum + parseFloat(user.salary.amount);
      }, 0)
      .value();

    averageSalary = (salarySum / Object.values(response).length).toFixed(2);

    const positions = _.chain(response)
      .map((user) => {
        return user.position;
      })
      .uniq()
      .value();

    const avgSalaries = positions.map((pos) => {
      const averSal = _.where(response, { position: pos })
        .reduce((sum, user) => {
          return (
            sum +
            parseFloat(user.salary.amount) /
              _.where(response, { position: pos }).length
          );
        }, 0)
        .toFixed(2);

      return { position: pos, avgSalary: `${averSal} €` };
    });

    avgSalaries.forEach((profession) => {
      avgSalariesByPosition = {
        ...avgSalariesByPosition,
        [profession.position]: profession.avgSalary,
      };
    });
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
