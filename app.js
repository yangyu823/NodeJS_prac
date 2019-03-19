const express = require('express');
const bike = require('./bike.js');
const serveIndex = require('serve-index');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/";
const url = "mongodb://mongo/test";
const PORT = process.env.PORT || 9999;
app.set('view engine', 'ejs');


/*
Adding new motorcycle to database
*/
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

app.use(function (req, res, next) {
    res.locals.userValue = null;
    next();
});
app.post('/add/new', function (req, res) {
    const result = {
        name: req.body.name,
        brand: req.body.brand,
        country: req.body.country,
        capacity: req.body.capacity,
        url: req.body.url
    };

    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        const dbo = db.db("motorcycle");
        const bike = result;
        dbo.collection("superbike").insertOne(bike, function(err, res) {
            if (err) throw err;
            console.log("Adding new motorcycle");
            db.close();
        });
    });
    console.log(result);
    res.render('insert', {
        userValue: result,
        topicHead: 'Add Bike'
    });
});

/*
Delete motorcycle from database
*/
app.delete("/delete/:name", (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        const dbo = db.db("motorcycle");
        // const query = {brand: req.params.brand};
        dbo.collection("superbike").createIndex({name: "text"})
        dbo.collection("superbike").deleteOne({$text: {$search: req.params.name}}, function (err, result) {
            if (err) throw err;
            // res.send(result);
            console.log("DELETE SUCCESSFUL")
            res.send("Delete Successful");
            db.close();
        })
    })
});


// Time console log
// app.use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     next();
// });

/*
This is for opening files
*/
app.use('/files', express.static('public'))
// This is for files index system
app.use('/files', serveIndex('public'));


app.use('/', express.static('homepage'));
app.use('/', serveIndex('homepage'));

app.use('/add', bike)
app.use('/', bike);



/*Testing area*/
app.all('/hello',(req,res)=>{
    res.send('Hello world')
})




app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));