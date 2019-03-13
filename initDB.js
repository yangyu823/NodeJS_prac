const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    const dbo = db.db("motorcycle");
    const myobj = [
        {
            name: 'Panigale 1299',
            brand: 'Ducati',
            country: 'Italy',
            capacity: '1300cc',
            url: 'https://static.toiimg.com/img/59581974/Master.jpg'
        },
        {
            name: 'RSV4',
            brand: 'Aprilia',
            country: 'Italy',
            capacity: '1000cc',
            url: "https://cdn.dealerspike.com/imglib/v1/800x600/imglib/trimsdb/8654091-0-50936701.jpg"
        },
        {
            name: 'Triumph',
            brand: 'Triumph',
            country: 'UK',
            capacity: '675cc',
            url: "https://www.boostcruising.com/database/crop/4/800/600/readersrides/files/2011_Triumph_Daytona_675_7700434.jpg"
        },
        {
            name: 'S1000RR',
            brand: 'BMW',
            country: 'Germany',
            capacity: '1000cc',
            url: "https://i.ebayimg.com/images/g/G08AAOSw5cZcFmAH/s-l800.jpg"
        },
        {
            name: 'R1M',
            brand: 'Yamaha',
            country: 'Japan',
            capacity: '1000cc',
            url: "https://www.gtainside.com/downloads/picr/2015-07/1437724720_33661.jpg"
        },
        {
            name: 'ZX10R',
            brand: 'Kawasaki',
            country: 'Japan',
            capacity: '1000cc',
            url: "https://ultimatemotorcycling.com/wp-content/uploads/2016/03/2016-kawasaki-zx-10r-ninja-abs-krt-motorcycle-buyers-guide-1.jpg"
        },
        {
            name: 'GSXR1000',
            brand: 'Suzuki',
            country: 'Japan',
            capacity: '1000cc',
            url: "https://cdn.cycletrader.com/topics/suzuki-gsxr-1000.png"
        },
        {
            name: 'CBR1000RR',
            brand: 'Honda',
            country: 'Japan',
            capacity: '1000cc',
            url: "https://cdp.azureedge.net/products/USA/HO/2016/MC/SUPERSPORT/CBR1000RR_SP/50/REPSOL_CHAMPION_SPECIAL/2000000006.jpg"
        },


    ];
    dbo.collection("superbike").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        console.log("Database initial setup successful !!!!");
        db.close();
    });
});
