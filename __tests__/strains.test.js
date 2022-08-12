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
  afterAll(() => {
    pool.end();
  });
});
