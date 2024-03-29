const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pets', () => {
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: '16',
      colour: 'brown',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a pet', async () => {
    const pet = {
      name: 'tommy',
      age: 8,
      colour: 'brown',
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  });
});