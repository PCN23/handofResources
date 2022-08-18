const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /strains should return a list of strains', async () => {
    const resp = await request(app).get('/strains');
    //expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Gorilla glue',
        thc: '25',
        grower: 'High Valley',
        year: '2020',
      },
      {
        id: '2',
        name: 'Bruce Banner',
        thc: '28',
        grower: 'High Master Hill',
        year: '2021',
      },
      {
        id: '3',
        name: 'Blue Dream',
        thc: '32',
        grower: 'Juicy Juice',
        year: '2019',
      },
      {
        id: '4',
        name: 'Golden Goat',
        thc: '35',
        grower: 'Goats house',
        year: '2022',
      },
    ]);
  });
  it('#GET strains/:id should return a single strain', async () => {
    const resp = await request(app).get('/strains/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Bruce Banner',
      thc: '28',
      grower: 'High Master Hill',
      year: '2021',
    });
  });
  it('#POST /strains should create a new strain', async () => {
    const newStrain = {
      name: 'Road glass', 
      thc: '45', 
      grower: 'Treehuger',
      year: '2022',
    };
    const resp = await request(app).post('/strains').send(newStrain);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newStrain,
    });
  });
  it('#PUT /strains/:id should update an existing strain', async () => {
    const resp = await request(app).put('/strains/1').send({
      year: '2021',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.year).toBe('2021');
  });
  it('#DELETE /strains/:id should delete a strain', async () => {
    const resp = await request(app).delete('/strains/1');
    expect(resp.status).toBe(200);
    const deleteResp = await request(app).get('/strains/1');
    expect(deleteResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
