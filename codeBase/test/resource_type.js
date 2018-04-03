const request = require('supertest');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const url = 'http://localhost:3000';

var id = '';

chai.use(chaiHttp);
describe('Resource_Type Test', function () {
    this.timeout(15000);
    describe('Add Resource-Type', function () {
        this.timeout(15000);
        it('When Data is Valid in Add Functionality', function (done) {
            chai.request(url)
                .post('/api/addResourceType')
                .set('Content-Type', 'application/json')
                .send({resourceType_name : "Courses", resourceType_displayname : "Courses", resourceType_description : "courses Description", resourceType_actions :  [{action_name : "read"}], application_id : "5aaa377a4284b328904e3619"})
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        expect(res.statusCode).to.equal(200);
                        id = res.body._id;

                        done();
                    } else {
                        assert.fail("Resource-Type already exists.");
                    }
                });
        });

        it('When Data is Invalid in Add Functionality', function (done) {
            chai.request(url)
                .post('/api/addResourceType')
                .set('Content-Type', 'application/json')
                .send({resourceType_name : "", resourceType_displayname : "Courses", resourceType_description : "courses Description", resourceType_actions :  [{action_name : "read"}], application_id : "5aaa377a4284b328904e3619"})
                .end((err, res) => {
                    if (res.statusCode == 500) {
                        expect(res.statusCode).to.equal(500);
                        done();
                    } else {
                        assert.fail("ResourceType already exist.");
                    }
                });
        });

        it('When Duplicate Data is being Add.', function (done) {
            chai.request(url)
                .post('/api/addResourceType')
                .set('Content-Type', 'application/json')
                .send({resourceType_name : "Courses", resourceType_displayname : "Courses", resourceType_description : "courses Description", resourceType_actions :  [{action_name : "read"}], application_id : "5aaa377a4284b328904e3619"})
                .end((err, res) => {
                    if (res.statusCode == 500) {
                        expect(res.statusCode).to.equal(500);
                        done();
                    } else {
                        assert.fail("Data already exists!");
                    }
                });
        });
    });
    describe('Update Resource-Type', function () {
        it('When Data is Valid in Update Functionality', function (done) {
            chai.request(url)
                .put('/api/updateResourceType/' + id)
                .set('Content-Type', 'application/json')
                .send({resourceType_name : "Academy Course", resourceType_displayname : "Academy Course", resourceType_description : "Academy course Description", resourceType_actions :  [{action_name : "read"}], application_id : "5aaa377a4284b328904e3619"})
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    } else {
                        assert.fail("Resource-Type is not updated.");
                    }
                });
        });
    });
    describe('Delete Resource-Type', function () {
        it('Delete Functionality', function (done) {
            chai.request(url)
                .delete('/api/delResourceType/' + id)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    } else {
                        assert.fail("Resource-Type is not deleted.");
                    }
                });
        });
    });
});