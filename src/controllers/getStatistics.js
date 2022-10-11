const payroll = require("../../data/payroll.json");
const getEmployeesStatistics = require("./index");

const statistics = getEmployeesStatistics(payroll);

module.exports = (req, res) => {
  res.status(200);
  res.send({
    number_of_employees: Object.values(payroll).length,
    sum_of_paid_salaries: statistics.salarySum.toFixed(2),
    average_salary: statistics.averageSalary,
    average_salary_by_position: statistics.avgSalariesByPosition,
  });
};
