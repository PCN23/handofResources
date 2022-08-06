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
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM glasses WHERE id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Glass(rows[0]);
  }
  static async insert(glass) {
    const { rows } = await pool.query(
      'INSERT INTO glasses (name, glassblower, gas_used, color) VALUES ($1, $2, $3, $4) RETURNING *',
      [glass.name, glass.glassblower, glass.gas_used, glass.color]
    );
    return new Glass(rows[0]);
  }
  static async updatedById(id, newArr) {
    const glass = await Glass.getById(id);
    if (!glass) return null;
    const newData = { ...glass, ...newArr };
    const { rows } = await pool.query(
      'UPDATE glasses SET name = $2, glassblower = $3, gas_used = $4, color = $5 WHERE id = $1 RETURNING *;',
      [id, newData.name, newData.glassblower, newData.gas_used, newData.color]
    );
    return new Glass(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM glasses WHERE id = $1 RETURNING *',
      [id]
    );
  }
}

module.exports = { Glass };
