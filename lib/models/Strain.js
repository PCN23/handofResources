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
}

module.exports = { Strain };
