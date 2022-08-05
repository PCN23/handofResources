const pool = require('../utils/pool');

class Glass {
  id;
  name;
  glassblower;
  gas_used;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.glassblower = row.glassblower;
    this.gas_used = row.gas_used;
    this.color = row.color;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM glasses;');
    return rows.map((row) => new Glass(row));
  }
}

module.exports = { Glass };
