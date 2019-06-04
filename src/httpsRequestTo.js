const https = require('https');

module.exports = (url, options = {}) => {
    const defaults = {
        headers: { 'Accept': 'application/json' },
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        https
            .request(url, { ...defaults, ...options }, (response) => {
                const body = [];

                response.on('data', chunk => body.push(chunk));
                response.on('end', () => resolve(Buffer.concat(body)
                    .toString()));
            })
            .on('error', err => reject(err.message))
            .end();
    });
};
