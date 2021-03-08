import mongoose from 'mongoose';
import request from 'supertest'

import Planet from '../src/schema/Planet';
import app from '../src/app';

describe('Test for Planet Controller', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/B2W_StarWars_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await Planet.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Should return 400 if no name is provided', async() => {
    const response = await request(app).post('/planets').send({
      climate: 'arid',
      terrain: 'desert'
    })
    expect(response.status).toBe(400)
  });

  it('Should return 400 if no climate is provided', async() => {
    const response = await request(app).post('/planets').send({
      name: 'Tatooine',
      terrain: 'desert'
    })
    expect(response.status).toBe(400)
  });

  it('Should return 400 if no terrain is provided', async() => {
    const response = await request(app).post('/planets').send({
      name: 'Tatooine',
      climate: 'arid',
    })
    expect(response.status).toBe(400)
  });

  it('should be able to create a new Planet', async () => {
    const response = await request(app).post('/planets').send({
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert'
    })

    expect(response.status).toBe(200);
  });

  it('should return an error if a given name is not registered at the SWAPI', async() => {
    const response = await request(app).post('/planets').send({
      name: 'Not registered name',
      climate: 'arid',
      terrain: 'desert'
    });

    expect(response.status).toBe(404);
  })

  it('Should not be able to create with an already used name', async() => {
    const response = await request(app).post('/planets').send({
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert'
    });

    expect(response.status).toBe(400);
  });

  it('Should be able to find all planets', async() => {
    await request(app).post('/planets').send({
      name: 'Alderaan',
      climate: 'temperate',
      terrain: 'grasslands, mountains'
    });

    const response = await request(app).get('/planets');

    expect(response.body.length).toBe(2);
  });

  it('Should be able to find a planet by its name', async() => {
    const response = await request(app).get('/planets/search/name?name=Tatooine');

    expect(response.status).toBe(200);
  });

  it('Should be able to find a planet by its ID', async() => {
    const planet = await Planet.create({ 
      name: 'Endor', climate: 'temperate', terrain: 'forests, mountains, lakes' 
    });

    const id = planet._id;

    const find = await request(app).get(`/planets/${id}`);

    expect(find.status).toBe(200);
  });

  it('Should be able to delete', async() => {
    const planet = await Planet.create({ 
      name: 'dagobah', climate: 'murky', terrain: 'swamp, jungles' 
    });

    const id = planet._id;

    const deletePlanet = await request(app).delete(`/planets/${id}`);

    expect(deletePlanet.status).toBe(204);
  })
})
