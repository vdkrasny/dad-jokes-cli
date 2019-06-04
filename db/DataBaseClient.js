const fs = require('fs');
const path = require('path');

class DataBaseClient {
    constructor(fileName) {
        this.filePath = path.join(__dirname, `${fileName}.json`);

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
                if (!(parsedData instanceof Array)) {
                    throw new Error(`No data was saved. Please, check the ${this.filePath} file structure. It must be an array.`);
                }

                parsedData.push(data);

                return this.write(parsedData);
            })
            .catch(({ message }) => console.log(`Error: ${message}`));
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
