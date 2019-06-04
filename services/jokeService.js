const DataBaseClient = require('../db/DataBaseClient');
const httpsRequestTo = require('../src/httpsRequestTo');

const { getRandomInt } = require('../utils');

const fileName = 'jokes';
const jokesDBClient = new DataBaseClient(fileName);

async function getJokes(searchParams = {}) {
    const apiUrl = new URL('https://icanhazdadjoke.com');
    const searchParamsKeys = Object.keys(searchParams);

    let jokes = [];

    if (searchParamsKeys.length) {
        apiUrl.pathname = '/search';
        searchParamsKeys.forEach(key => apiUrl.searchParams.set(key, searchParams[key]));
    }

    const firstPageRawData = await httpsRequestTo(apiUrl);
    const {
        current_page: currentPage,
        next_page: nextPage,
        total_pages: totalPages,
        results: firstPageJokes
    } = JSON.parse(firstPageRawData);

    if (currentPage < nextPage && nextPage <= totalPages) {
        const pagesRequests = [];

        for (let i = nextPage; i <= totalPages; i += 1) {
            apiUrl.searchParams.set('page', i);

            pagesRequests.push(httpsRequestTo(apiUrl));
        }

        const pagesRawData = await Promise.all(pagesRequests);
        const pagesData = pagesRawData.map(data => JSON.parse(data));

        jokes = pagesData.reduce((mergedJokes, { results: pageJokes }) => mergedJokes.concat(pageJokes), firstPageJokes);
    } else {
        jokes = firstPageJokes;
    }

    if (!jokes.length) {
        throw new Error('No jokes were found for that search term.');
    }

    return jokes;
}

function findMostCommonJoke(jokes) {
    if (!jokes.length) {
        throw new Error('There is no data to show.');
    }

    // idsWithQuantity = { [id]: [number of times the id was found], ... }
    const idsWithQuantity = jokes.reduce((collection, { id }) => {
        if (!collection[id]) {
            collection[id] = 0;
        }
        collection[id] += 1;

        return collection;
    }, {});

    // sorted in descending order and got the first id
    const mostCommonId = Object.keys(idsWithQuantity)
        .sort((a, b) => idsWithQuantity[b] - idsWithQuantity[a])[0];

    return jokes.find(({ id }) => id === mostCommonId);
}

module.exports.getJokeByTerm = async function (term) {
    try {
        const jokes = await getJokes({ term });
        const randomIdx = getRandomInt(0, jokes.length);
        const { id, joke } = jokes[randomIdx];

        await jokesDBClient.add({ id, joke });

        return joke;
    } catch (err) {
        return err;
    }
};

module.exports.getMostCommonJoke = async function () {
    try {
        const jokes = await jokesDBClient.read();
        const { joke } = findMostCommonJoke(jokes);

        return joke;
    } catch (err) {
        return err;
    }
};
