const axios = require('axios');
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
exports.SequentialTest = async (data)=>{
    console.log('Start writing file');
    try {
        await writeFile('./public/motogp.json', data);
    }catch (e) {
        console.error(e);
    }
    return Promise.resolve();
};