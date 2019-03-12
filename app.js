const express = require('express')
const bike = require('./bike.js')
const data = require('./public/data')
const serveIndex = require('serve-index');
const app = express()
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 9999

// Time console log
// app.use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     next();
// });

// This is for opening files
app.use('/files', express.static('public'))

// This is for files index system
app.use('/files', serveIndex('public'))


app.use('/', express.static('home'))
app.use('/', serveIndex('home'))


app.all('/secret', (req, res, next) => {
    res.send('Ducati Panigale 1299s')
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})


app.route('/superbike')
    .get((req, res) => {
        res.send(data)
    })
    .post(function (req, res) {
        res.send('Add a custom bike')
    })
    .delete(function (req, res) {
        res.send('Delete a custom bike')
    })


app.use('/', bike)
app.use('/panigale/:capacity(\\d+)', bike)


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))