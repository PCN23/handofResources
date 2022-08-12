const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /jerseys should return a list of jerseys', async () => {
    const resp = await request(app).get('/jerseys');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Real Madrid FC',
        country: 'Spain',
        league: 'La Liga Santander',
        cost: '105',
      },
      {
        id: '2',
        name: 'Manchester United FC',
        country: 'England',
        league: 'Barclays English Preimer Leauge',
        cost: '90',
      },
      {
        id: '3',
        name: 'Juventus CF',
        country: 'Italy',
        league: 'Seria A',
        cost: '93',
      },
      {
        id: '4',
        name: 'PSG',
        country: 'France',
        league: 'League un',
        cost: '85',
      },
      {
        id: '5',
        name: 'Timbers',
        country: 'USA',
        league: 'MLS',
        cost: '500',
      },
    ]);
  });
  it('#GET jerseys/:id should return a single jersey', async () => {
    const resp = await request(app).get('/jerseys/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Manchester United FC',
      country: 'England',
      league: 'Barclays English Preimer Leauge',
      cost: '90',
    });
  });
  ('#POST /jerseys should create a new jersey', async () => {
    const newJersey = {
      name: 'Cuervos FC',
      country: 'Mexico',
      league: 'Liga MX',
      cost: '65',
    };
    const resp = await request(app).post('/jerseys').send(newJersey);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newJersey,
    });
  });
  ('#PUT /jerseys/:id should update an existing jersey', async () => {
    const resp = await request(app).put('/jerseys/1').send({
      cost: '150',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.cost).toBe('150');
  });
  ('#DELETE /jerseys/:id should delete a jersey', async () => {
    const resp = await request(app).delete('/jerseys/1');
    expect(resp.status).toBe(200);
    const delResp = await request(app).get('/jerseys/1');
    expect(delResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
