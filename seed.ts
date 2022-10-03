import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Employees = require("./data/payroll.json");

type Employee = {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: string;
  registeredAt: string;
  position: string;
  salary: {
    amount: string;
  };
  bank: {
    iban: string;
    bic: string;
  };
  crypto: {
    bitcoinAddress: string;
  };
};

// async function runSeeders() {
//   // Employee
//   await Promise.all(
//     Employees.map(async (employee: Employee) =>
//       prisma.employee.upsert({
//         where: { userId: employee.userId },
//         update: {},
//         create: employee,
//       })
//     )
//   );
//   // Salary
//   await Promise.all(
//     Employees.map(async (employee: Employee) =>
//       prisma.salary.upsert({
//         where: { userId: employee.userId },
//         update: {},
//         create: employee.salary,
//       })
//     )
//   );


async function runSeeders() {
  await Promise.all(
    Employees.map(
      async (employee: Employee) =>
        await prisma.employee.create({
          data: employee,
        })
    )
  );
  //Salary;
  await Promise.all(
    Employees.map(async (employee: Employee) =>
      prisma.salary.create({
        data : employee.salary,
      })
    )
  );
    // Bank
  await Promise.all(
    Employees.map(async (employee: Employee) =>
    prisma.bank.create({
      data : employee.bank,
    })
    )
  );
  // Crypto
  await Promise.all(
    Employees.map(async (employee: Employee) =>
    prisma.crypto.create({
      data : employee.crypto,
    })
    )
  );
}
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });
