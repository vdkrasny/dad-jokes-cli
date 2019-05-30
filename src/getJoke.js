const https = require('https');

const getJoke = (searchQuery = {}) => new Promise((resolve, reject) => {
    const searchQueryKeys = Object.keys(searchQuery);
    let searchStr = '';

    if (searchQueryKeys.length !== 0) {
        const searchArgs = searchQueryKeys.map(key => `${key}=${searchQuery[key]}`);

        searchStr = `search?${searchArgs.join('&')}`;
    }

    https
        .get(`https://icanhazdadjoke.com/${searchStr}`, { headers: { 'Accept': 'application/json' } }, (response) => {
            const body = [];

            response.on('data', chunk => body.push(chunk));
            response.on('end', () => {
                const bodyString = Buffer.concat(body)
                    .toString();

                resolve(JSON.parse(bodyString));
            });
        })
        .on('error', err => reject(err.message));
});

module.exports = getJoke;
