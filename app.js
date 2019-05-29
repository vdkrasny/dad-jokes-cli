const DBC = require('./src/DataBaseClient');
const getJoke = require('./src/getJoke');

const { getRandomInt } = require('./utils');

const dbClient = new DBC();
const args = process.argv.slice(2);

if (args[0] === '--searchTearm') {
    getJoke({ term: args[1] })
        .then(({ results }) => {
            const resultsLength = results.length;

            if (resultsLength !== 0) {
                const randomIdx = getRandomInt(0, resultsLength);

                dbClient.add('jokes', {
                    id: results[randomIdx].id,
                    joke: results[randomIdx].joke
                });
            } else {
                console.log('No jokes were found for that search term.');
            }
        })
        .catch(err => console.log(`[app.js] Error: ${err}`));
} else if (args[0] === '--leaderboard') {
    dbClient.findMostСommon('jokes');
} else {
    getJoke()
        .then(({ id, joke }) => dbClient.add('jokes', { id, joke }))
        .catch(err => console.log(`[app.js] Error: ${err}`));
}
