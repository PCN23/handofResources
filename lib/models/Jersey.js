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
    if (rows.length === 0) {
      return null;
    }
    return new Jersey(rows[0]);
  }

  static async insert(jersey) {
    const { rows } = await pool.query(
      'INSERT INTO jerseys (name, country, league, cost) VALUES ($1, $2, $3, $4) RETURNING *',
      [jersey.name, jersey.country, jersey.league, jersey.cost]
    );
    return new Jersey(rows[0]);
  }

  static async updateById(id, newAtt) {
    const jersey = await Jersey.getById(id);
    if (!jersey) return null;
    const newData = { ...jersey, ...newAtt };
    const { rows } = await pool.query(
      'UPDATE jerseys SET name = $2, country = $3, league = $4, cost = $5 WHERE id = $1 RETURNING *;',
      [id, newData.name, newData.country, newData.league, newData.cost]
    );
    return new Jersey(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM jerseys WHERE id = $1 RETURNING *',
      [id]
    );
  }
}

module.exports = { Jersey };
