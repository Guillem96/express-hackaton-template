process.env.NODE_ENV = "test";

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index');
var should = chai.should();

chai.use(chaiHttp);

describe('User tests', function () {
    it('should not list ALL users on /users GET', function (done) {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                if (err)
                    throw err;
                res.should.have.status(403);
                done();
            });
    });

    it('should register a user on /users POST', function (done) {
        chai.request(server)
            .post('/users')
            .send({ username: "test-user", password_1: "1234", password_2: "1234"})
            .end(function (err, res) {
                if (err)
                    throw err;
                res.should.have.status(201);
                res.body.should.have.property("user");
                done();
            });
    });
});