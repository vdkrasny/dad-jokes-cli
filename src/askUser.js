const prompts = require('prompts');

const constants = Object.freeze({
    RUN_MODE_TERM: 'RUN_MODE_TEARM',
    RUN_MODE_LIDER: 'RUN_MODE_LIDER'
});

module.exports = {
    constants,
    prompt: async function name(arr) {
        const { RUN_MODE_TERM, RUN_MODE_LIDER } = constants;

        const questions = [
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
        ];

        const result = await prompts(questions);

        return result;
    }
};
