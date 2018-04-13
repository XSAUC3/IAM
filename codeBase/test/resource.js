const request =require('supertest');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const url = 'http://216.218.175.45:3000';

var id = '';

chai.use(chaiHttp);
describe('Resource Test',function(){
    this.timeout(15000);
    describe('Add Resource',function(){
        this.timeout(15000);
        it('When Data is Valid in Add Functionality', function (done) {
            chai.request(url)
            .post('/api/addResource')
            .set('Content-Type',  'application/json')
            .send({res_name : "B.Sc. IT", res_displayname : "B.Sc. IT", res_descrpition : "School of IT", Resource_typeid : "5ab1fef105fb1a0ca48a7dd7", attribute_id :  [{attribute_id:"5ab1fef105fb1a0ca48a7dce",attribute_value:"4"}], application_id : "5aaa377a4284b328904e3619"})
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200); 
                    id = res.body._id;
                                 
                    done();
                } else {
                    assert.fail("Resource is already exist.");
                }
            });
        });

        it('When Data is Invalid in Add Functionality', function (done) {
            chai.request(url)
            .post('/api/addResource')
            .set('Content-Type',  'application/json')
            .send({res_name : "", res_displayname : "B.Sc. IT", res_descrpition : "School of IT", Resource_typeid : "5ab1fef105fb1a0ca48a7dd7", attribute_id :  [{attribute_id:"5ab1fef105fb1a0ca48a7dce",attribute_value:"4"}], application_id : "5aaa377a4284b328904e3619"})
            .end((err, res) => {
                if(res.statusCode == 500){
                    expect(res.statusCode).to.equal(500);              
                    done();
                } else {
                    assert.fail("Resource is already exist.");
                }
            });
        });

        it('When Duplicate Data is being Add.', function (done) {
            chai.request(url)
            .post('/api/addResource')
            .set('Content-Type',  'application/json')
            .send({res_name : "B.Sc. IT", res_displayname : "B.Sc. IT", res_descrpition : "School of IT", Resource_typeid : "5ab1fef105fb1a0ca48a7dd7", attribute_id :  [{attribute_id:"5ab1fef105fb1a0ca48a7dce",attribute_value:"4"}], application_id : "5aaa377a4284b328904e3619"})
            .end((err, res) => {
                if(res.statusCode == 500){
                    expect(res.statusCode).to.equal(500);              
                    done();
                } else {
                    assert.fail("Data is not Exist..!");
                }
            });
        });
    });
    describe('Update Resource',function(){
        it('When Data is Valid in Update Functionality', function (done) {
            chai.request(url)
            .put('/api/UpdateResource/' + id)
            .set('Content-Type',  'application/json')
            .send({res_name : "M.Sc. IT", res_displayname : "M.Sc. IT", res_descrpition : "School of IT", Resource_typeid : "5ab1fef105fb1a0ca48a7dd7", attribute_id :  [{attribute_id:"5ab1fef105fb1a0ca48a7dce",attribute_value:"5"}], application_id : "5aaa377a4284b328904e3619"})
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200);              
                    done();
                } else {
                    assert.fail("Resource is not updated.");
                }
            }); 
        });
    });
    describe('Delete Resource',function(){
        it('Delete Functionality', function (done) {
            chai.request(url)
            .delete('/api/DeleteResource/' + id)
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200);              
                    done();
                } else {
                    assert.fail("Resource is not deleted.");
                }
            }); 
        });
    });
});