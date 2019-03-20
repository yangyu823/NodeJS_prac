const axios = require('axios');
const url = 'https://api.adviceslip.com/advice';


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
