import supertest from 'supertest';
import { expect } from 'chai';
import '../src/config/db.config.js';
import mongoose from 'mongoose';

const requester = supertest('http://localhost:8080');

let cookieData;
let productId;

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

// GET ALL PRODUCTS

describe('GET /api/products', () => {
  it("should return an object with an array 'payload' that contains the products", async () => {
    const objParams = { limit: 10, sort: -1, page: 1 };

    const response = await requester
      .get('/api/products')
      .set('Cookie', [`${cookieData.name}=${cookieData.value}`])
      .query(objParams);

    const { products } = response._body;

    expect(products).to.be.an('object');
    expect(products).to.have.property('docs');
    expect(products.docs).to.be.an('array');
    expect(products.docs).to.have.lengthOf(objParams.limit);
    expect(response.statusCode).to.be.equals(200);
  });
});

// CREATE PRODUCT

describe('POST /api/products', () => {
  const newObjectMock = {
    title: 'Test Title',
    description: 'description',
    price: 4000,
  };

  before(async () => {
    await mongoose.connection
      .collection('products')
      .deleteOne({ title: 'Test Title' });
  });
  it('should create a new product', async () => {
    const response = await requester
      .post('/api/products')
      .set('Cookie', [`${cookieData.name}=${cookieData.value}`])
      .send(newObjectMock);

    const {
      _body: { createdProduct },
    } = response;

    expect(createdProduct).to.be.an('object');
    expect(createdProduct)
      .to.have.property('title')
      .equals(newObjectMock.title);
    expect(response.statusCode).to.be.equals(200);
    productId = createdProduct._id;
  });
});

// UPDATE PRODUCT

describe('PUT /api/products/:pid', function () {
  it('Should update a product by id, changing its description to "Updated Description"', async function () {
    const updateBody = {
      description: 'Updated Description',
    };

    const response = await requester
      .put(`/api/products/${productId}`)
      .set('Cookie', [`${cookieData.name}=${cookieData.value}`])
      .send(updateBody);
    expect(response.statusCode).to.be.equals(200);
    expect(response._body.message).to.equals('Product updated');
  });
});

// DELETE PRODUCT

describe('DELETE /api/products/:pid', function () {
  it('Should delete a product by id', async function () {
    const response = await requester
      .delete(`/api/products/${productId}`)
      .set('Cookie', [`${cookieData.name}=${cookieData.value}`]);

    expect(response._body.message).to.equals('Product deleted');
    expect(response.statusCode).to.be.equals(200);
  });
});
