const os = require('os');
const fs = require('fs');

const myobj = {};

// console.log(os.cpus());

// console.log(os.freemem());
//
// console.log(os.homedir());
function doA() {
    return new Promise(((resolve, reject) => {
        fs.readFile('./public/hello.txt', (err, data) => {
            if (!err) {
                resolve(data.toString())
            }
        });
    }))
}

function doB() {
    return new Promise(((resolve, reject) => {
        fs.readFile('./public/helloworld.txt', (err, data) => {
            if (!err) {
                resolve(data.toString())
            }
        });
    }))
}

async function test() {
    myobj['data1'] = await doA();
    myobj['data2'] = await doB();
    console.log(myobj)
}

test();