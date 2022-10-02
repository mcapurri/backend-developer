const { faker } = require('@faker-js/faker');

function createRandomUser() {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
        position: faker.name.jobType(),
        salary: {
            amount: faker.finance.amount(3000, 9000),
        },
        bank: {
            iban: faker.finance.iban(),
            bic: faker.finance.bic(),
        },
        crypto: {
            bitcoinAddress: faker.finance.bitcoinAddress(),
        }
    };
}

module.exports = {
    createRandomUser,
};
