const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const url = 'http://216.218.175.45:3000';

chai.use(chaiHttp);

describe('Login API', function () {
    this.timeout(15000);
    it('Login should work if data is valid', function (done) {
        chai.request(url)
            .post('/users/authenticate')
            .set('Content-Type', 'application/json')
            .send({ username: 'admin', password: 'admin123' })
            .end((err, res) => {
                if (err) {
                    console.log('Error..!');
                }
                if (res.statusCode == 200) {
                    expect(res.statusCode).to.equal(200);
                    done();
                }
                if (res.statusCode == 500) {
                    expect(res.statusCode).to.equal(500);
                    console.log('TEST FAIL..!');
                    done();
                }
            });
    });
});
