const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Example Test', function() {
    it('basic test equality var', done => {
        let x = 10;
        let y = 10;
        let result = x + y;

        expect(result).to.equal(20);
        done();
    });
});

describe('Hello world testing', () => {
    it('Basic Hello world API testing', (done) => {
        chai.request('http://localhost:9999')
            .get('/hello')
            .end((err, res) => {
                // console.log(res.text)
                // chai.expect(res.status).to.equal(200);
                // chai.expect(res.text).to.equal("Hello world");

                expect(res).to.have.status(200)
                expect(res.text).to.equal("Hello world")
                // res.should.have.status(200);
                // res.body.should.be.a('string');
                done();
            })
    })
});

describe('Bike API Testing', () => {
    it('API should return json format project', (done) => {
        chai.request('http://localhost:9999')
            .get('/panigale/1000')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("capacity").with.valueOf("1000")
                done();
            })
    })
});