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
  it('#GET jersey/:id should return a single jersey', async () => {
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
  afterAll(() => {
    pool.end();
  });
});
