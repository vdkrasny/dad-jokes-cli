const fs = require('fs');
const path = require('path');

class DataBaseClient {
    constructor(fileName) {
        this.filePath = path.join(__dirname, '..', `${fileName}.json`);

        fs.open(this.filePath, 'wx', (err, fd) => {
            if (!err) {
                fs.close(fd, (e) => {
                    if (e) {
                        console.error(`Close file Error: ${e}`);
                    }
                });
            }
        });
    }

    add(data) {
        return this.read()
            .then((parsedData) => {
                if (parsedData instanceof Array) {
                    parsedData.push(data);

                    return this.write(parsedData);
                }
                throw new Error(`No data was saved. Please, check the ${this.filePath} file structure. It must be an array.`);
            })
            .then(() => data)
            .catch(({ message }) => console.log(`Error: ${message}`));
    }

    findMostСommon() {
        return this.read()
            .then((parsedData) => {
                if (parsedData.length === 0) {
                    throw new Error('There is no data to show.');
                }

                // countedId = { [id]: [number of times the id was found], ... }
                const countedId = parsedData.reduce((result, current) => {
                    if (!result[current.id]) {
                        result[current.id] = 0;
                    }
                    result[current.id] += 1;

                    return result;
                }, {});

                // sorted in descending order and got the first id
                const mostСommonId = Object.keys(countedId)
                    .sort((a, b) => countedId[b] - countedId[a])[0];

                return parsedData.find(item => item.id === mostСommonId);
            });
    }

    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve([]);
                    }
                }
            });
        });
    }

    write(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filePath, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = DataBaseClient;
