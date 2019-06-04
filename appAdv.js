const prompts = require('prompts');

const jokeService = require('./services/jokeService');

const RUN_MODE_TERM = 'RUN_MODE_TEARM';
const RUN_MODE_LIDER = 'RUN_MODE_LIDER';

(async () => {
    const { runMode, searchTerm } = await prompts([
        {
            type: 'select',
            name: 'runMode',
            message: 'Selected action:',
            choices: [
                { title: 'Get a joke using search term', value: RUN_MODE_TERM },
                { title: 'Return the most popular joke', value: RUN_MODE_LIDER }
            ]
        },
        {
            type: chooseMode => chooseMode === RUN_MODE_TERM ? 'text' : null,
            name: 'searchTerm',
            message: 'Enter a subject for a joke'
        }
    ]);

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
