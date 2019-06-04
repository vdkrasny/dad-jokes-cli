const fs = require('fs');
const path = require('path');

class DataBaseClient {
    constructor(fileName) {
        this.filePath = path.join(__dirname, `${fileName}.json`);
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
            this.checkFileExist()
                .then(() => {
                    fs.readFile(this.filePath, (err, data) => {
                        if (err) {
                            reject(err);
                        }

                        try {
                            resolve(JSON.parse(data));
                        } catch (e) {
                            resolve([]);
                        }
                    });
                })
                .catch(err => reject(err));
        });
    }

    write(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filePath, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

    checkFileExist() {
        return new Promise((resolve, reject) => {
            fs.stat(this.filePath, (err) => {
                if (err === null) {
                    resolve();
                } else if (err.code === 'ENOENT') {
                    this.write([])
                        .then(() => resolve());
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = DataBaseClient;
