const https = require('https');

module.exports = function (url) {
    const options = {
        headers: { 'Accept': 'application/json' },
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        const request = https.request(url, options, (response) => {
            const body = [];

            response.on('data', chunk => body.push(chunk));
            response.on('end', () => resolve(Buffer.concat(body)
                .toString()));
        });

        request.on('error', err => reject(err));
        request.end();
    });
};
