const { getJokeByTerm, getMostCommonJoke } = require('./services/jokeService');

const [lineArg, lineArgValue] = process.argv.slice(2);

const CLI_NAME = 'node app.js';
const CLI_FLAG_SEARCH_TEARM = '--searchTearm';
const CLI_FLAG_LEADERBOARD = '--leaderboard';

const usageGuide = `
Usage: ${CLI_NAME} <command> [value]

where <command> is one of:
    ${CLI_FLAG_SEARCH_TEARM}, ${CLI_FLAG_LEADERBOARD}
`;

(async function () {
    switch (lineArg) {
        case CLI_FLAG_SEARCH_TEARM:
            await getJokeByTerm(lineArgValue);
            break;
        case CLI_FLAG_LEADERBOARD:
            await getMostCommonJoke();
            break;
        default:
            console.log(usageGuide);
            break;
    }
}());
