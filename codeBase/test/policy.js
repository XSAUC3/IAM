const request = require('supertest');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const url = 'http://216.218.175.45:3000';

var id = '';

chai.use(chaiHttp);
describe('Policy Test', function () {
    this.timeout(15000);
    describe('Add Policy', function () {
        this.timeout(15000);
        it('When Data is Valid in Add Functionality', function (done) {
            chai.request(url)
                .post('/api/addPolicy')
                .set('Content-Type', 'application/json')
                .send({ application_id: '5aaa38ce94a59603e8e002dc', policy_name: 'hey', policy_type: 'grant', policy_constrains: 'bye', policy_principals: [ { id:'5aaa3efd94a59603e8e002eb', type: 'role', name: 'Cook' }, { id: '5aaa3f0394a59603e8e002ec', type: 'role', name: 'Waiter' } ], policy_targets: [ { resource_id: '5aaa3eb394a59603e8e002e9', resource_name: 'Refrigiraotor' }, { resource_id: '5aaa418894a59603e8e002f4', resource_name: 'Tables&Chairs' } ] })
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        expect(res.statusCode).to.equal(200);
                        id = res.body.data._id;
                        done();
                    } else {
                        // console.log(res.statusCode);                      
                        assert.fail("Policy already exists.");
                    }
                });
        });

        it('When Duplicate Data is being Add', function (done) {
            chai.request(url)
                .post('/api/addPolicy')
                .set('Content-Type', 'application/json')
                .send({ application_id: '5aaa38ce94a59603e8e002dc', policy_name: 'hey', policy_type: 'grant', policy_constrains: 'bye', policy_principals: [ { id:'5aaa3efd94a59603e8e002eb', type: 'role', name: 'Cook' }, { id: '5aaa3f0394a59603e8e002ec', type: 'role', name: 'Waiter' } ], policy_targets: [ { resource_id: '5aaa3eb394a59603e8e002e9', resource_name: 'Refrigiraotor' }, { resource_id: '5aaa418894a59603e8e002f4', resource_name: 'Tables&Chairs' } ] })
                .end((err, res) => {
                    if (res.statusCode == 500) {
                        expect(res.statusCode).to.equal(500);
                        done();
                    } else {
                        assert.fail("Data does not exist!");
                    }
                });
        });
    });
    // describe('Update Policy', function () {
    //     it('When Data is Valid in Update Functionality', function (done) {
    //         chai.request(url)
    //             .put('/api/updatePolicy' + id)
    //             .set('Content-Type', 'application/json')
    //             .send({ _id: id, application_id: '5aaa38ce94a59603e8e002dc', policy_name: 'abc', policy_type: 'grant', policy_constrains: 'xyz', policy_principals: [ { _id: '5ac34ec22c860a1d68007e2f', id: '5aaa3efd94a59603e8e002eb', type: 'role', name: 'Cook' } ], policy_targets: [ ] })
    //             .end((err, res) => {
    //                 if (res.statusCode == 200) {
    //                     expect(res.statusCode).to.equal(200);
    //                     done();
    //                 } else {
    //                     assert.fail("Policy is not updated.");
    //                 }
    //             });
    //     });
    // });
    describe('Delete Policy', function () {
        it('Delete Functionality', function (done) {
            chai.request(url)
                .delete('/api/delPolicy/' + id)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    } else {
                        assert.fail("Policy is not deleted.");
                    }
                });
        });
    });
});

