const pool = require('../utils/pool');

class Jersey {
  id;
  name;
  country;
  league;
  cost;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.country = row.country;
    this.league = row.league;
    this.cost = row.cost;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM jerseys;');
    return rows.map((row) => new Jersey(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM jerseys
        WHERE id = $1
        `,
      [id]
    );
    return new Jersey(rows[0]);
  }

  static async insert(jersey) {
    const { rows } = await pool.query(
      'INSERT INTO jerseys (name, country, league, cost) VALUES ($1, $2, $3, $4) RETURNING *',
      [jersey.name, jersey.country, jersey.league, jersey.cost]
    );
    return new Jersey(rows[0]);
  }
}

module.exports = { Jersey };
