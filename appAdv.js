
const { constants, prompt } = require('./src/askUser');
const jokeService = require('./services/jokeService');

(async () => {
    const { runMode, searchTerm } = await prompt();
    const { RUN_MODE_TERM, RUN_MODE_LIDER } = constants;

    switch (runMode) {
        case RUN_MODE_TERM: {
            try {
                const joke = await jokeService.getJokeByTerm(searchTerm);

                console.log(joke);
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }

            break;
        }
        case RUN_MODE_LIDER: {
            try {
                const joke = await jokeService.getMostCommonJoke();

                console.log(joke);
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }

            break;
        }
        default: {
            break;
        }
    }
})();
