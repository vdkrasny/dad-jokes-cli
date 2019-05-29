const https = require('https');

const getJoke = (searchQuery = {}) => new Promise((resolve, reject) => {
    const searchQueryKeys = Object.keys(searchQuery);
    let searchStr = '';

    if (searchQueryKeys.length !== 0) {
        const searchArgs = searchQueryKeys.map(key => `${key}=${searchQuery[key]}`);
        searchStr = `search?${searchArgs.join('&')}`;
    }
    https
        .get(`https://icanhazdadjoke.com/${searchStr}`, { headers: { 'Accept': 'application/json' } }, (resp) => {
            let rawData = '';
            resp.on('data', (chunk) => { rawData += chunk; });
            resp.on('end', () => resolve(JSON.parse(rawData)));
        })
        .on('error', err => reject(err.message));
});

module.exports = getJoke;
