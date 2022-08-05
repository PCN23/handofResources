const pool = require('../utils/pool');

class Cereal {
  id;
  name;
  maker;
  price;
  size;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.maker = row.maker;
    this.price = row.price;
    this.size = row.size;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cereals;');
    return rows.map((row) => new Cereal(row));
  }
}

module.exports = { Cereal };
