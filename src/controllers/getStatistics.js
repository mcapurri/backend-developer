const payroll = require("../../data/payroll.json");
const _ = require("underscore");

const salarySum = _.chain(payroll)
  .reduce((sum, user) => {
    return sum + parseFloat(user.salary.amount);
  }, 0)
  .value();

const averageSalary = (salarySum / Object.values(payroll).length).toFixed(2);

const positions = _.chain(payroll)
  .map((user) => {
    return user.position;
  })
  .uniq()
  .value();

const avgSalaries = positions.map((pos) => {
  const averSal = _.where(payroll, { position: pos })
    .reduce((sum, user) => {
      return (
        sum +
        parseFloat(user.salary.amount) /
          _.where(payroll, { position: pos }).length
      );
    }, 0)
    .toFixed(2);

  return { position: pos, avgSalary: `${averSal} €` };
});
let avgSalariesByPosition = {};

avgSalaries.forEach((profession) => {
  avgSalariesByPosition = {
    ...avgSalariesByPosition,
    [profession.position]: profession.avgSalary,
  };
});

module.exports = (req, res) => {
  res.status(200);
  res.send({
    number_of_employees: Object.values(payroll).length,
    sum_of_paid_salaries: salarySum.toFixed(2),
    average_salary: averageSalary,
    average_salary_by_position: avgSalariesByPosition,
  });
};
