const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('#GET /teams should return a list of teams', async () => {
    const resp = await request(app).get('/teams');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Arsenal',
        country: 'England',
        league: 'English Premier',
        coach: 'Arteta',
      },
      {
        id: '2',
        name: 'Monaco',
        country: 'France',
        league: 'League un',
        coach: 'Harrison',
      },
      {
        id: '3',
        name: 'Getafe',
        country: 'Spain',
        league: 'La liga',
        coach: 'Luis',
      },
      {
        id: '4',
        name: 'Miami fc',
        country: 'USA',
        league: 'MLS',
        coach: 'Polska',
      },
    ]);
  });
  it.skip('#GET teams/:id should return a single team', async () => {
    const resp = await request(app).get('/teams/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Monaco',
      country: 'France',
      league: 'League un',
      coach: 'Harrison',
    });
  });
  it.skip('#POST /teams should create a new team', async () => {
    const newTeam = {
      name: 'Paws',
      country: 'China',
      league: 'China NA',
      coach: 'Shinsu',
    };
    const resp = await request(app).post('/teams').send(newTeam);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newTeam,
    });
  });
  it.skip('#PUT /teams/:id should update an existing team', async () => {
    const resp = await request(app).put('/teams/2').send({
      coach: 'Garrison',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.coach).toBe('Garrison');
  });
  it.skip('#DELETE /teams/:id should delete a teams', async () => {
    const resp = await request(app).delete('/teams/1');
    expect(resp.status).toBe(200);
    const deleteResp = await request(app).get('/teams/1');
    expect(deleteResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
