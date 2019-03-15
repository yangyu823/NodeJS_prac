const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Mongo DB home page', () => {
    it('Check data for html', (done) => {
        chai.request('http://localhost:9999')
            .get('/alldb')
            .end((err, res) => {
                expect(res).to.have.status(200)
                console.log(res.text)
                // expect(res.text)
                done();
            })
    })
});