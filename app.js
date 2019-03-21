const express = require('express');
const router = require('./bike.js');
const app = express();
const serveIndex = require('serve-index');
const parser = require('body-parser');
const api = require('./3rdAPI/api');
const PORT = process.env.PORT || 9999;
app.set('view engine', 'ejs');

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

app.use(function (req, res, next) {
    res.locals.userValue = null;
    next();
});
// Time console log
// app.use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     next();
// });

// This is for opening files
app.use('/files', express.static('public'));
// This is for files index system
app.use('/files', serveIndex('public'));


// This is for rendering homepage
app.use(express.static('homepage'));
app.use('/', router);


/*Testing area*/
app.all('/hello', (req, res) => {
    res.send('Hello world')
});

app.get('/test/advice', async (req, res) => {
    try {
        const advice = await api.getAdvice();
        res.send(advice)
    } catch (e) {
        res.status(404).send({error: message})
    }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));