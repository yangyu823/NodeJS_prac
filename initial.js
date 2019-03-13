const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    const dbo = db.db("motorcycle");
    const myobj = [
        { name: 'Panigale 1299', brand: 'Ducati', country:'Italy'},
        { name: 'RSV4', brand: 'Aprilia', country:'Italy'},
        { name: 'Triumph', brand: 'Triumph', country:'UK'},
        { name: 'S1000RR', brand: 'BMW', country:'Germany'},
        { name: 'R1M', brand: 'Yamaha', country:'Japan'},
        { name: 'ZX10R', brand: 'Kawasaki', country:'Japan'},
        { name: 'GSXR1000', brand: 'Suzuki', country:'Japan'},
        { name: 'CBR1000RR', brand: 'Honda', country:'Japan'},



    ];
    dbo.collection("superbike").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});
