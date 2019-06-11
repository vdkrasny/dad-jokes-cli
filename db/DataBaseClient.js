const fs = require('fs');
const path = require('path');

class DataBaseClient {
    constructor(fileName) {
        this.filePath = path.join(__dirname, `${fileName}.json`);
    }

    async add(data) {
        try {
            const parsedData = await this.read();

            if (!(parsedData instanceof Array)) {
                throw new Error(`No data was saved. Please, check the ${this.filePath} file structure. It must be an array.`);
            }

            parsedData.push(data);

            return this.write(parsedData);
        } catch (err) {
            return console.log(`Error: ${err.message}`);
        }
    }

    read() {
        return new Promise(async (resolve, reject) => {
            const isExist = await this.checkFileExist();

            if (!isExist) {
                await this.write([]);
            }

            fs.readFile(this.filePath, (err, data) => {
                if (err) {
                    reject(err);
                }

                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`No data was read. Please, check the ${this.filePath} file. It must have a valid JSON structure.`));
                }
            });
        });
    }

    write(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filePath, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                }

                return resolve();
            });
        });
    }

    checkFileExist() {
        return new Promise((resolve, reject) => {
            fs.stat(this.filePath, (err) => {
                if (err === null) {
                    resolve(true);
                } else if (err.code === 'ENOENT') {
                    resolve(false);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = DataBaseClient;
