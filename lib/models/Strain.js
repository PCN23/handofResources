const pool = require('../utils/pool');

class Strain {
  id;
  name;
  thc;
  grower;
  year;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.thc = row.thc;
    this.grower = row.grower;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM strains;');
    return rows.map((row) => new Strain(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM strains WHERE id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Strain(rows[0]);
  }
  static async insert(strain) {
    const { rows } = await pool.query(
      'INSERT INTO strains (name, thc, grower , year) VALUES ($1, $2, $3, $4) RETURNING *',
      [strain.name, strain.thc, strain.grower, strain.year]
    );
    return new Strain(rows[0]);
  }
}

module.exports = { Strain };
