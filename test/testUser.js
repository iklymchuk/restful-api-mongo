//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../app/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
	beforeEach((done) => { //Before each test we empty the database
		User.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET user', () => {
	  it('it should GET all the users', (done) => {
			chai.request(server)
		    .get('/user')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST user', () => {
	  it('it should not POST a user without password field', (done) => {
	  	let user = {
	  		username: "testUser1",
		}
			chai.request(server)
		    .post('/user')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('password');
			  	res.body.errors.password.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a user ', (done) => {
	  	let user = {
	  		username: "testUser1",
	  		password: "testUser1",
	  	}
			chai.request(server)
		    .post('/user')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('User successfully added!');
			  	res.body.user.should.have.property('username');
			  	res.body.user.should.have.property('password');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id user', () => {
	  it('it should GET a user by the given id', (done) => {
	  	let user = new User({ username: "testUser1", password: "testUser1" });
	  	user.save((err, user) => {
	  		chai.request(server)
		    .get('/user/' + user.id)
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('username');
			  	res.body.should.have.property('password');
			  	res.body.should.have.property('_id').eql(user.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id user', () => {
	  it('it should UPDATE a user given the id', (done) => {
	  	let user = new User({username: "newUser1", password: "newUser1"})
	  	user.save((err, user) => {
				chai.request(server)
			    .put('/user/' + user.id)
			    .send({username: "newUser1", password: "newUser2"})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('User updated!');
				  //	res.body.user.should.have.property('password').eql(newUser2);
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id user', () => {
	  it('it should DELETE a user given the id', (done) => {
	  	let user = new User({username: "newUser1", password: "newUser1"})
	  	user.save((err, user) => {
				chai.request(server)
			    .delete('/user/' + user.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('User successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});