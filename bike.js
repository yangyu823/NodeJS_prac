const express = require('express');
const data = require("./public/data");
const router = express.Router();
const app = express();


// router.use(function timeLog(req, res, next) {
//     console.log('Time ', Date.now())
//     next()
// })
// router.get("/brand/:brand", (req, res) => {
//     const found = data.find(bike => {
//         return bike.brand.toUpperCase() === req.params.brand.toUpperCase();
//     })
//
//     if (!found) {
//         const notFound = {
//             status: 404,
//             message: 'Can not find the bike with brand name ' + req.params.brand
//         }
//
//         res.status(404)
//             .send(notFound)
//     }
//
//     res.send(found)
// })

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

})

router.get('/all', (req, res) => {
    res.render('index', {bike: data});
});

router.get('/origin/:country', (req, res) => {
    const result = data.filter(bike => {
        return bike.country.toUpperCase() === req.params.country.toUpperCase();
    })
    res.send(result)
})


router.get('/panigale/:capacity(\\d+)', (req, res) => {
    res.send(req.params)
});


module.exports = router