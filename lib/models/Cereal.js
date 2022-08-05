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
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cereals WHERE id = $1', [
      id,
    ]);
    return new Cereal(rows[0]);
  }
  static async insert(cereal) {
    const { rows } = await pool.query(
      'INSERT INTO cereals (name, maker, price, size) VALUES ($1, $2, $3, $4) RETURNING *',
      [cereal.name, cereal.maker, cereal.price, cereal.size]
    );
    return new Cereal(rows[0]);
  }

  static async updatedById(id, newArr) {
    const cereal = await Cereal.getById(id);
    if (!cereal) return null;
    const newData = { ...cereal, ...newArr };
    const { rows } = await pool.query(
      'UPDATE cereals SET name = $2, maker = $3, price = $4, size = $5 WHERE id = $1 RETURNING *;',
      [id, newData.name, newData.maker, newData.price, newData.size]
    );
    return new Cereal(rows[0]);
  }
}

module.exports = { Cereal };
