const jokeService = require('./services/jokeService');

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
        case CLI_FLAG_SEARCH_TEARM: {
            try {
                const joke = await jokeService.getJokeByTerm(lineArgValue);

                console.log(joke);
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }

            break;
        }
        case CLI_FLAG_LEADERBOARD: {
            try {
                const joke = await jokeService.getMostCommonJoke();

                console.log(joke);
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }

            break;
        }
        default: {
            console.log(usageGuide);
            break;
        }
    }
}());
