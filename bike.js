const express = require('express');
const data = require("./public/data");
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const router = express.Router();
const upload = require('./bike_upload');
const Resize = require('./bike_resize');
//
// const url = "mongodb://localhost:27017/";
const url = "mongodb://mongo/test";
//
const api = require('./3rdAPI/api');

// This is using Mongo Database to search for bike
router.get("/brand/:name", (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        const dbo = db.db("motorcycle");
        // const query = {brand: req.params.brand};
        dbo.collection("superbike").createIndex({name: "text"});
        dbo.collection("superbike").findOne({$text: {$search: req.params.name}}, function (err, result) {
            if (err) throw err;
            // res.send(result);
            res.render('bike_mongo', {info: result});
            db.close();
        })
    })
});

// This is Using local js File
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

// This is using mongo database to load all the data
router.get('/alldb', (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        const result = [];
        if (err) {
            const title = "DB fail";
            res.render('index_mongo', {bike: result, title: title});
        } else {
            const dbo = db.db("motorcycle");
            dbo.collection("superbike").find({}).toArray(function (err, result) {
                if (err) throw err;
                const title = "SuperBike - Mongo DB";
                res.render('index_mongo', {bike: result, title: title});
                db.close();
            })
        }
    })
});

/*
This is using local file to display all the data
*/
router.get('/all', async (req, res) => {
    const advice = await api.getAdvice();
    res.render('index', {bike: data, info: advice});
});

router.get('/origin/:country', (req, res) => {
    const result = data.filter(bike => {
        return bike.country.toUpperCase() === req.params.country.toUpperCase();
    });
    res.send(result)
});

// Rendering Add New Bike Page
router.get('/add', function (req, res) {
    res.render('insert', {
        topicHead: 'Add new Bike'
    });
    console.log('user accessing Home page');
});

router.get('/panigale/:capacity(\\d+)', (req, res) => {
    res.send(req.params)
});

router.all('/secret', (req, res) => {
    res.send('Ducati Panigale 1299s');
    console.log('Accessing the secret section ...');
    // next() // pass control to the next handler
});

// Adding new motorcycle to database
router.post('/add/new', upload.single('image'), async (req, res) => {
    const imagePath = path.join(__dirname, '/homepage/images');
    const fileUpload = new Resize(imagePath);
    console.log((req.body));
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    const result = {
        name: req.body.name,
        brand: req.body.brand,
        country: req.body.country,
        capacity: req.body.capacity,
        url: '/images/'+filename
    };
    // Add data into local json file
    api.AppendNew(result);

    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        const dbo = db.db("motorcycle");
        const bike = result;
        dbo.collection("superbike").insertOne(bike, (err, res) => {
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
router.delete("/delete/:name", (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        const dbo = db.db("motorcycle");
        // const query = {brand: req.params.brand};
        dbo.collection("superbike").createIndex({name: "text"});
        dbo.collection("superbike").deleteOne({$text: {$search: req.params.name}}, function (err, result) {
            if (err) throw err;
            // res.send(result);
            console.log("DELETE SUCCESSFUL");
            res.send("Delete Successful");
            db.close();
        })
    })
});

// router.use(function timeLog(req, res, next) {
//     console.log('Time ', Date.now())
//     next()
// })

module.exports = router;