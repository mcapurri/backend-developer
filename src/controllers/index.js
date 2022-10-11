const _ = require("underscore");

function getEmployeesStatistics(payroll) {
  const salarySum = _.chain(payroll)
    .reduce((sum, user) => {
      return sum + parseFloat(user.salary.amount);
    }, 0)
    .value();
  console.log(_.chain(payroll));
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
  return { salarySum, averageSalary, avgSalariesByPosition };
}

module.exports = getEmployeesStatistics;
