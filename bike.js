const express = require('express');
const data = require("./public/data");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const router = express.Router();



/*
This is using Mongo Database to search for bike
*/
router.get("/brand/:name", (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        const dbo = db.db("motorcycle");
        // const query = {brand: req.params.brand};
        dbo.collection("superbike").createIndex({name: "text"})
        dbo.collection("superbike").findOne({$text: {$search: req.params.name}}, function (err, result) {
            if (err) throw err;
            // res.send(result);
            res.render('bike_mongo', {info: result});
            db.close();
        })
    })
});

/*
This is Using local js File
*/
router.get('/bike/:name', (req, res) => {

    const found = data.find(bike => {
        return bike.name.toUpperCase() === req.params.name.toUpperCase();
    });
    if (!found) {
        const notFound = {
            status: 404,
            message: 'Can not find the bike with brand name ' + req.params.name
        };

        res.status(404)
            .send(notFound)
    } else {
        res.render('bike', {info: found});
    }

});


/*
This is using mongo database to load all the data
*/
router.get('/alldb', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        const dbo = db.db("motorcycle");
        dbo.collection("superbike").find({}).toArray( function (err, result) {
            if (err) throw err;
            // res.send(result)
            res.render('index_mongo', {bike: result});
            db.close();
        })
    })
});


/*
This is using local file to display all the data
*/
router.get('/all', (req, res) => {
    res.render('index', {bike: data});
});

router.get('/origin/:country', (req, res) => {
    const result = data.filter(bike => {
        return bike.country.toUpperCase() === req.params.country.toUpperCase();
    });
    res.send(result)
});


/*
Add New Bike Page
*/
router.get('/add', function (req, res) {
    res.render('insert', {
        topicHead: 'Add new Bike',
    });
    console.log('user accessing Home page');
});




router.get('/panigale/:capacity(\\d+)', (req, res) => {
    res.send(req.params)
});

router.all('/secret', (req, res, next) => {
    res.send('Ducati Panigale 1299s');
    console.log('Accessing the secret section ...');
    next() // pass control to the next handler
});

router.use(function timeLog(req, res, next) {
    console.log('Time ', Date.now())
    next()
})

module.exports = router;