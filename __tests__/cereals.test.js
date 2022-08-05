const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /cereals should return a list of cereal', async () => {
    const resp = await request(app).get('/cereals');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Carlos V',
        maker: 'Nestel',
        price: '18',
        size: 'large',
      },
      {
        id: '2',
        name: 'ChocaPic',
        maker: 'Nestel',
        price: '25',
        size: 'large',
      },
      {
        id: '3',
        name: 'Pelotitas',
        maker: 'Gonely',
        price: '36',
        size: 'extra large',
      },
      {
        id: '4',
        name: 'kariot',
        maker: 'Telma',
        price: '14',
        size: 'medium',
      },
      {
        id: '5',
        name: 'Krispy cream os',
        maker: 'kellog',
        price: '19',
        size: 'small',
      },
    ]);
  });
  it('#GET cereals/:id should return a single cereal', async () => {
    const resp = await request(app).get('/cereals/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'ChocaPic',
      maker: 'Nestel',
      price: '25',
      size: 'large',
    });
  });
  it('#POST /cereals should create a new cereal', async () => {
    const newCereal = {
      name: 'Hogies', 
      maker: 'Harold', 
      price: '15',
      size: 'large',
    };
    const resp = await request(app).post('/cereals').send(newCereal);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newCereal,
    });
  });
  it('#PUT /cereals/:id should update an existing cereal', async () => {
    const resp = await request(app).put('/cereals/1').send({
      price: '20',
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.price).toBe('20');
  });
  afterAll(() => {
    pool.end();
  });
});
