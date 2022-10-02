const express = require('express');
const app = express();
const port = 3000;

/*
 * Implement those controllers to retrieve the statistics 
 * as provided in the README file.
 * 
 *  - getStatistics         - retrieve the data directly from file
 *  - getStatisticsFromDB   - use a preferred database engine
 */
const getStatistics = require('./controllers/getStatistics');
const getStatisticsFromDB = require('./controllers/getStatisticsFromDB');

app.get('/stats', getStatistics);
app.get('/stats-from-db', getStatisticsFromDB);

app.listen(port, () => { 
    console.log(`Your app is listening on port ${port}`);
});
