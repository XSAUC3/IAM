const request = require('supertest');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const url = 'http://localhost:3000';

var id = '';

chai.use(chaiHttp);
describe('Role Test', function () {
    this.timeout(15000);
    describe('Add Role', function () {
        this.timeout(15000);
        it('When Data is Valid in Add Functionality', function (done) {
            chai.request(url)
                .post('/api/role/addRole')
                .set('Content-Type', 'application/json')
                .send({ Role_name: "Students", Application_id: '5aaa377a4284b328904e3619' })
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        expect(res.statusCode).to.equal(200);           
                        id = res.body._id;
                        done();
                    } else {
                        assert.fail("Role is already exist.");
                    }
                });
        });

        it('When Data is Invalid in Add Functionality', function (done) {
            chai.request(url)
                .post('/api/role/addRole')
                .set('Content-Type', 'application/json')
                .send({ Role_name: "", Application_id: '5aaa377a4284b328904e3619' })
                .end((err, res) => {
                    if (res.statusCode == 500) {
                        expect(res.statusCode).to.equal(500);
                        done();
                    } else {
                        assert.fail("Role already exist.");
                    }
                });
        });

        it('When Duplicate Data is being Add.', function (done) {
            chai.request(url)
                .post('/api/role/addRole')
                .set('Content-Type', 'application/json')
                .send({ Role_name: "Students", Application_id: '5aaa377a4284b328904e3619' })
                .end((err, res) => {
                    if (res.statusCode == 500) {
                        expect(res.statusCode).to.equal(500);
                        done();
                    } else {
                        assert.fail("Data is not Exist..!");
                    }
                });
        });
    });
    describe('Update Role', function () {
        it('When Data is Valid in Update Functionality', function (done) {
            chai.request(url)
                .put('/api/role/updateRole/' + id)
                .set('Content-Type', 'application/json')
                .send({ Role_name: "Teachers", Application_id: '5aaa377a4284b328904e3619' })
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    } else {
                        assert.fail("Role is not updated.");
                    }
                });
        });
    });
    describe('Delete Role', function () {
        it('Delete Functionality', function (done) {
            chai.request(url)
                .delete('/api/role/delRole/' + id)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    } else {
                        assert.fail("Role is not deleted.");
                    }
                });
        });
    });
});