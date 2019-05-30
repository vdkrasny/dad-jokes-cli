const DataBaseClient = require('./src/DataBaseClient');
const getJoke = require('./src/getJoke');
const mergeJokePages = require('./src/mergeJokePages');

const { getRandomInt } = require('./utils');

const JokesDBClient = new DataBaseClient('jokes');
const [lineArg, lineArgValue] = process.argv.slice(2);

switch (lineArg) {
    case '--searchTearm':
        mergeJokePages({ term: lineArgValue })
            .then((results) => {
                const randomIdx = getRandomInt(0, results.length);

                return JokesDBClient.add({ id: results[randomIdx].id, joke: results[randomIdx].joke });
            })
            .then(({ joke }) => console.log(joke))
            .catch(({ message }) => console.log(`Error: ${message}`));
        break;
    case '--leaderboard':
        JokesDBClient.findMostСommon()
            .then(({ joke }) => console.log(joke))
            .catch(({ message }) => console.log(`Error: ${message}`));
        break;
    default:
        getJoke()
            .then(({ id, joke }) => JokesDBClient.add({ id, joke }))
            .then(({ joke }) => console.log(joke))
            .catch(({ message }) => console.log(`Error: ${message}`));
        break;
}
