const axios = require('axios');
const url = 'https://api.adviceslip.com/advice';


expors.getAdvice = async () => {
    let response = await axios.get(url)
        .then(res => {
        return res.data;
    })
        .catch(err => {
            throw new Error(err)
        });
    return response;
};
