const os = require('os');
const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const jsonfile = require('jsonfile');
const beep = () => process.stdout.write("\x07");
const delay = (second) => new Promise((resolves => {
    setTimeout(resolves, second * 1000);
}));
const myobj = {};


const file = './public/NewBike.json';
exports.AppendNew = async (data) => {
    jsonfile.writeFile(file, data, {flag: 'a'}, (err) => {
        if (err) console.error(err);
    });
};


/*  System output info playground
console.log(os.cpus());
console.log(os.freemem());
console.log(os.homedir());
*/

// Promises Playground with some async
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

// test();

// Async process playground
const SequentialTest = async (data) => {
    console.log('starting');
    await delay(1);
    console.log('waiting');
    await delay(2);
    try {
        await writeFile('./public/bike.json', data);
        beep();
    } catch (e) {
        console.error(e);
    }
    console.log('file.txt created ');
    await delay(3);
    // await unlink('file.txt');
    beep();
    console.log('file.txt removed');
    return Promise.resolve();
};

// SequentialTest('hello world');
