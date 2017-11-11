// /* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
// require('../spec_helper');
// const User = require('../../models/user');
//
// describe('Authentications', function() {
//
//   beforeEach(done => {
//     User.collection.remove();
//     done();
//   });
//
//   afterEach(done => {
//     User.collection.remove();
//     done();
//   });
//
//   describe('POST /api/register', function() {
//     it('should register a user with the correct credentials', function(done) {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           user: {
//             firstName: 'person',
//             lastName: 'person',
//             image: 'person',
//             role: 'student',
//             email: 'person@person.com',
//             password: 'password',
//             passwordConfirmation: 'password'
//           }
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(200);
//           expect(res.body).to.be.a('object');
//           expect(res.body.message).to.eq('Thanks for registering.');
//           expect(res.body.token).to.be.a('string');
//           done();
//         });
//     });
//     it('should not register a user without a firstName', function(done) {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           user: {
//             email: 'person@person.com',
//             password: 'password',
//             passwordConfirmation: 'password'
//           }
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(400);
//           expect(res.body).to.be.a('object');
//           expect(res.body.errors).to.eq('ValidationError: firstName: Path `firstName` is required.');
//           expect(res.body.message).to.eq('Bad Request');
//           done();
//         });
//     });
//     it('should not register a user without a lastName', function(done) {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           user: {
//             email: 'person@person.com',
//             password: 'password',
//             passwordConfirmation: 'password'
//           }
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(400);
//           expect(res.body).to.be.a('object');
//           expect(res.body.errors).to.eq('ValidationError: lastName: Path `lastName` is required.');
//           expect(res.body.message).to.eq('Bad Request');
//           done();
//         });
//     });
//     it('should not register a user without a role', function(done) {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           user: {
//             email: 'person@person.com',
//             password: 'password',
//             passwordConfirmation: 'password'
//           }
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(400);
//           expect(res.body).to.be.a('object');
//           expect(res.body.errors).to.eq('ValidationError: role: Path `role` is required.');
//           expect(res.body.message).to.eq('Bad Request');
//           done();
//         });
//     });
//     it('should not register a user without an email', function(done) {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           user: {
//             firstName: 'person',
//             password: 'password',
//             passwordConfirmation: 'password'
//           }
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(400);
//           expect(res.body).to.be.a('object');
//           expect(res.body.errors).to.eq('ValidationError: email: Path `email` is required.');
//           expect(res.body.message).to.eq('Bad Request');
//           done();
//         });
//     });
//     it('should not register a user without a password', function(done) {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           user: {
//             firstName: 'person',
//             email: 'person@person.com',
//             passwordConfirmation: 'password'
//           }
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(400);
//           expect(res.body).to.be.a('object');
//           expect(res.body.errors).to.eq('ValidationError: password: required');
//           expect(res.body.message).to.eq('Bad Request');
//           done();
//         });
//     });
//     it('should not register a user with no password confirmation', function(done) {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           user: {
//             firstName: 'person',
//             email: 'person@person.com',
//             password: 'password'
//           }
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(400);
//           expect(res.body).to.be.a('object');
//           expect(res.body.errors).to.eq('ValidationError: passwordConfirmation: does not match');
//           expect(res.body.message).to.eq('Bad Request');
//           done();
//         });
//     });
//   });
//
//   describe('POST /api/login', function() {
//
//     beforeEach(done => {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           user: {
//             email: 'person@person.com',
//             password: 'password',
//             passwordConfirmation: 'password'
//           }
//         })
//         .end(() => {
//           done();
//         });
//     });
//
//     it('should login a user with the correct credentials', function(done) {
//       api
//         .post('/api/login')
//         .set('Accept', 'application/json')
//         .send({
//           email: 'person@person.com',
//           password: 'password'
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(200);
//           expect(res.body).to.be.a('object');
//           expect(res.body.message).to.eq('Welcome back!');
//           expect(res.body.token).to.be.a('string');
//           done();
//         });
//     });
//     it('should not login a user without an email', function(done) {
//       api
//         .post('/api/login')
//         .set('Accept', 'application/json')
//         .send({
//           password: 'password'
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(401);
//           expect(res.body).to.be.a('object');
//           expect(res.body.message).to.eq('Invalid credentials.');
//           expect(Object.keys(res.body)).to.not.include('token');
//           done();
//         });
//     });
//     it('should not login a user with the wrong password', function(done) {
//       api
//         .post('/api/login')
//         .set('Accept', 'application/json')
//         .send({
//           email: 'person@person.com',
//           password: '123123'
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(401);
//           expect(res.body).to.be.a('object');
//           expect(res.body.message).to.eq('Invalid credentials.');
//           expect(Object.keys(res.body)).to.not.include('token');
//           done();
//         });
//     });
//   });
// });
