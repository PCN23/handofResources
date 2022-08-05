const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /glasses should return a list of glasses', async () => {
    const resp = await request(app).get('/glasses');
    expect(resp.status).toBe(200);
      expect(resp.body).toEqual([
        
          
    ]);
  });
});
