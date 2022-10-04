import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Employees = require("../data/payroll.json");

async function seeder() {
  await Promise.all(
    Employees.map(
      async (employee) =>
        await prisma.employee.create({
          data: {
            userId: employee.userId,
            username: employee.username,
            email: employee.email,
            avatar: employee.avatar,
            password: employee.password,
            birthdate: employee.birthdate,
            registeredAt: employee.registeredAt,
            position: employee.position,
            salary: {
              create: {
                amount: employee.salary.amount,
              },
            },
            bank: {
              create: {
                iban: employee.bank.iban,
                bic: employee.bank.bic,
              },
            },
            crypto: {
              create: {
                bitcoinAddress: employee.crypto.bitcoinAddress,
              },
            },
          },
        })
    )
  );
}

seeder()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });
