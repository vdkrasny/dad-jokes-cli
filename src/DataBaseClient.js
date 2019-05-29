const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'jokes.json');

class DataBaseClient {
    add(key, item) {
        this.read()
            .then((parsedData) => {
                if (parsedData[key] === undefined) {
                    parsedData[key] = [];
                }

                parsedData[key].push(item);

                this.write(parsedData)
                    .then(() => console.log(item.joke))
                    .catch(err => console.log(`DBClient.write Error: ${err}`));
            })
            .catch(err => console.log(`DBClient.read Error: ${err}`));
    }

    findMostСommon(key) {
        this.read()
            .then((parsedData) => {
                if (parsedData[key] !== undefined && parsedData[key].length !== 0) {
                    // countedJokesId = { [id]: [number of times the id was found], ... }
                    const countedJokesId = parsedData[key].reduce((result, current) => {
                        if (!result[current.id]) {
                            result[current.id] = 0;
                        }
                        result[current.id] += 1;

                        return result;
                    }, {});

                    // sorted in descending order and got the first id
                    const mostСommonJokeId = Object.keys(countedJokesId)
                        .sort((a, b) => countedJokesId[b] - countedJokesId[a])[0];

                    const leaderJoke = parsedData[key].find(item => item.id === mostСommonJokeId).joke;

                    console.log(leaderJoke);
                } else {
                    console.log('There is no data to show.');
                }
            })
            .catch(err => console.log(`DBClient.findMostСommon Error: ${err}`));
    }

    read() {
        return new Promise((res, rej) => {
            fs.readFile(FILE_PATH, (readErr, data) => {
                if (readErr) {
                    rej(readErr);
                } else {
                    res(JSON.parse(data));
                }
            });
        });
    }

    write(data) {
        return new Promise((res, rej) => {
            fs.writeFile(FILE_PATH, JSON.stringify(data), (writeErr) => {
                if (writeErr) {
                    rej(writeErr);
                } else {
                    res();
                }
            });
        });
    }
}

module.exports = DataBaseClient;
