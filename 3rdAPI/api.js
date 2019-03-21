const axios = require('axios');
const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const jsonfile = require('jsonfile');
const file = './public/NewBike.json';
const url = 'https://api.adviceslip.com/advice';

// Fetching from random advice api
exports.getAdvice = async () => {
    let response = await axios.get(url)
        .then(res => {
            return res.data.slip.advice;
        })
        .catch(err => {
            throw new Error(err)
        });
    return response;
};
exports.SequentialTest = async (data) => {
    console.log('Start writing file');
    const json = JSON.stringify(data);
    try {
        await writeFile('./public/NewBike.json', json);
    } catch (e) {
        console.error(e);
    }
    return Promise.resolve();
};


exports.AppendNew = async (data) => {
    jsonfile.writeFile(file, data, {flag: 'a'}, (err) => {
        if (err) console.error(err);
    });
};