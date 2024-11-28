import supertest from 'supertest';
import { expect } from 'chai';
import '../src/config/db.config.js';
import mongoose from 'mongoose';

const requester = supertest('http://localhost:8080');

let cookieData;
let userId;

before(async () => {
  let user = {
    email: 'admin@gmail.com',
    password: '123',
  };

  const response = await requester.post('/api/sessions/login').send(user);
  const cookie = response.headers['set-cookie'][0];
  cookieData = {
    name: cookie.split('=')[0],
    value: cookie.split('=')[1].split(';')[0],
  };
});

// GET ALL USERS

describe('GET /api/users', () => {
  it("should return an object with an array 'users' that contains all the users", async () => {
    const response = await requester
      .get('/api/users')
      .set('Cookie', [`${cookieData.name}=${cookieData.value}`]);

    const { users } = response._body;

    expect(users).to.be.an('array');
    // expect(users).to.have.property('docs');
    // expect(users.docs).to.be.an('array');
    // expect(users.docs).to.have.lengthOf(objParams.limit);
    expect(response.statusCode).to.be.equals(200);
  });
});

// // CREATE USER

// describe('POST /api/users', () => {
//   const newUserMock = {
//     first_name: 'Test Title',
//     last_name: 'description',
//     email: 'superTest@gmail.com',
//     password: '123',
//   };

//   before(async () => {
//     await mongoose.connection
//       .collection('users')
//       .deleteOne({ email: 'superTest@gmail.com' });
//   });
//   it('should create a new user', async () => {
//     console.log('pasa?');
//     const response = await requester
//       .post('/api/users')
//       // .set('Cookie', [`${cookieData.name}=${cookieData.value}`])
//       .send(newUserMock);

//     console.log({ response });
//     // const { _body: body } = response;

//     expect(response).to.be.an('object');
//     expect(body).to.have.key('createdUser');
//     // expect(createdProduct)
//     //   .to.have.property('title')
//     //   .equals(newObjectMock.title);
//     // expect(response.statusCode).to.be.equals(200);
//     // productId = createdProduct._id;
//   });
// });

// // UPDATE PRODUCT

// describe('PUT /api/products/:pid', function () {
//   it('Should update a product by id, changing its description to "Updated Description"', async function () {
//     const updateBody = {
//       description: 'Updated Description',
//     };

//     const response = await requester
//       .put(`/api/products/${productId}`)
//       .set('Cookie', [`${cookieData.name}=${cookieData.value}`])
//       .send(updateBody);
//     expect(response.statusCode).to.be.equals(200);
//     expect(response._body.message).to.equals('Product updated');
//   });
// });

// // DELETE PRODUCT

// describe('DELETE /api/products/:pid', function () {
//   it('Should delete a product by id', async function () {
//     const response = await requester
//       .delete(`/api/products/${productId}`)
//       .set('Cookie', [`${cookieData.name}=${cookieData.value}`]);

//     expect(response._body.message).to.equals('Product deleted');
//     expect(response.statusCode).to.be.equals(200);
//   });
// });
