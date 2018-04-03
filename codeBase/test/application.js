const request =require('supertest');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const url = 'http://localhost:3000';

var id = '';

chai.use(chaiHttp);
describe('Application Test',function(){
    this.timeout(15000);
    describe('Add Application',function(){
        this.timeout(15000);
        it('When Data is Valid in Add Functionality', function (done) {
            chai.request(url)
            .post('/api/addApp')
            .set('Content-Type',  'application/json')
            .send({app_name : "University", app_displayname : "University", app_description : "University description"})
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200); 
                    id = res.body._id;
                                 
                    done();
                } else {
                    assert.fail("Application is already exist.");
                }
            });
        });

        it('When Data is Invalid in Add Functionality', function (done) {
            chai.request(url)
            .post('/api/addApp')
            .set('Content-Type',  'application/json')
            .send({app_name : "", app_displayname : "University", app_description : "University description"})
            .end((err, res) => {
                if(res.statusCode == 500){
                    expect(res.statusCode).to.equal(500);              
                    done();
                } else {
                    assert.fail("Application is already exist.");
                }
            });
        });

        it('When Duplicate Data is being Add.', function (done) {
            chai.request(url)
            .post('/api/addApp')
            .set('Content-Type',  'application/json')
            .send({app_name : "University", app_displayname : "University", app_description : "University description"})
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
    describe('Update Application',function(){
        it('When Data is Valid in Update Functionality', function (done) {
            chai.request(url)
            .put('/api/updateApp/' + id)
            .set('Content-Type',  'application/json')
            .send({app_name : "Auro_University", app_displayname : "Auro_University", app_description : "Auro_University description"})
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200);              
                    done();
                } else {
                    assert.fail("Application is not updated.");
                }
            }); 
        });
    });
    describe('Delete Application',function(){
        it('Delete Functionality', function (done) {
            chai.request(url)
            .delete('/api/delApp/' + id)
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200);              
                    done();
                } else {
                    assert.fail("Application is not deleted.");
                }
            }); 
        });
    });
});