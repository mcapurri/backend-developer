const fs = require('fs');
const { createRandomUser } = require('./shared/dataGenerator');

const DATASET_LENGTH = 100;

const payroll = Array.from({ length: DATASET_LENGTH }).map(o => createRandomUser());

console.log(`Generated ${payroll.length} entries`);

fs.writeFileSync('data/payroll.json', JSON.stringify(payroll));

console.log(`======================`);
console.log(`First entry:`);

// Check the first entry
console.log(payroll[0]);
