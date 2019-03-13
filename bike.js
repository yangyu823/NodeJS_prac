const express = require('express');
const data = require("./public/data");

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const router = express.Router();




// router.use(function timeLog(req, res, next) {
//     console.log('Time ', Date.now())
//     next()
// })

// This is using Mongo Database
router.get("/brand/:brand", (req, res) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        const dbo = db.db("motorcycle");
        const query = {brand: req.params.brand};
        dbo.collection("superbike").createIndex({brand: "text"})
        dbo.collection("superbike").findOne({$text: {$search: req.params.brand}}, function (err, result) {
            if (err) throw err;
            // res.send(result.name)
            res.render('bike_mongo', {info: result});
            db.close();
        })
    })
});
// This is Using local js File
router.get('/bike/:brand', (req, res) => {

    const found = data.find(bike => {
        return bike.brand.toUpperCase() === req.params.brand.toUpperCase();
    })
    if (!found) {
        const notFound = {
            status: 404,
            message: 'Can not find the bike with brand name ' + req.params.brand
        }

        res.status(404)
            .send(notFound)
    } else {
        res.render('bike', {info: found});
    }

});


// This is using mongo database to load all the data
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


// This is using local file to display all the data
router.get('/all', (req, res) => {
    res.render('index', {bike: data});
});








router.get('/origin/:country', (req, res) => {
    const result = data.filter(bike => {
        return bike.country.toUpperCase() === req.params.country.toUpperCase();
    });
    res.send(result)
});


router.get('/panigale/:capacity(\\d+)', (req, res) => {
    res.send(req.params)
});


module.exports = router;