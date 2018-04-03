const request =require('supertest');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const url = 'http://localhost:3000';

var id = '';

chai.use(chaiHttp);
describe('Users Test',function(){
    this.timeout(15000);
    describe('Add Users',function(){
        this.timeout(15000);
        it('When Data is Valid in Add Functionality', function (done) {
            chai.request(url)
            .post('/api//user/Add')
            .set('Content-Type',  'application/json')
            .send({role:[{role_id:"5aaa3c1494a59603e8e002e3",role_name:"Super Admin"}], status:true, name:"Sam", username:"Sam", password:"$2a$04$zPxFnAig5TZjz9f/mdOzmOH4LLgioAgAfhe4Hd/Qff1HlsAxJm3Ou", email:"Sam@gmail.com"})
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200); 
                    id = res.body.data._id;         
                    done();
                } else {
                    assert.fail("Users is already exist.");
                }
            });
        });

        it('When Data is Invalid in Add Functionality', function (done) {
            chai.request(url)
            .post('/api/user/Add')
            .set('Content-Type',  'application/json')
            .send({role:[{role_id:"5aaa3c1494a59603e8e002e3",role_name:"Super Admin"}], status:true, name:"Sam", username:"", password:"$2a$04$zPxFnAig5TZjz9f/mdOzmOH4LLgioAgAfhe4Hd/Qff1HlsAxJm3Ou", email:"Sam@gmail.com"})
            .end((err, res) => {
                if(res.statusCode == 500){
                    expect(res.statusCode).to.equal(500);              
                    done();
                } else {
                    assert.fail("Users is already exist.");
                }
            });
        });

        it('When Duplicate Data is being Add.', function (done) {
            chai.request(url)
            .post('/api/user/Add')
            .set('Content-Type',  'application/json')
            .send({role:[{role_id:"5aaa3c1494a59603e8e002e3",role_name:"Super Admin"}], status:true, name:"Sam", username:"Sam", password:"$2a$04$zPxFnAig5TZjz9f/mdOzmOH4LLgioAgAfhe4Hd/Qff1HlsAxJm3Ou", email:"ronakisback@gmail.com"})
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
    describe('Update Users',function(){
        it('When Data is Valid in Update Functionality', function (done) {
            chai.request(url)
            .put('/api/UpdateUser/' + id)
            .set('Content-Type',  'application/json')
            .send({role:[{role_id:"5aaa3c1494a59603e8e002e3",role_name:"Admin"}], status:true, name:"Vishnu", username:"Vishnu", password:"$2a$04$zPxFnAig5TZjz9f/mdOzmOH4LLgioAgAfhe4Hd/Qff1HlsAxJm3Ou", email:"vishnu@gmail.com"})
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200);              
                    done();
                } else {
                    assert.fail("Users is not updated.");
                }
            }); 
        });
    });
    describe('Delete Users',function(){
        console.log(id);
        
        it('Delete Functionality', function (done) {
            chai.request(url)
            .delete('/api/DelUser/' + id)
            .end((err, res) => {
                if(res.statusCode == 200){
                    expect(res.statusCode).to.equal(200);              
                    done();
                } else {
                    assert.fail("Users is not deleted.");
                }
            }); 
        });
    });
});