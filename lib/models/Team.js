const pool = require('../utils/pool');

class Team {
  id;
  name;
  country;
  league;
  coach;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.country = row.country;
    this.league = row.league;
    this.coach = row.coach;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM teams;');
    return rows.map((row) => new Team(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM teams WHERE id = $1', [
      id
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Team(rows[0]);
  }
  static async insert(team) {
    const { rows } = await pool.query(
      'INSERT INTO teams (name, country, league, coach) VALUES ($1, $2, $3, $4) RETURNING *',
      [team.name, team.country, team.league, team.coach]
    );
    return new Team(rows[0]);
  }

  static async updatedById(id, newArr) {
    const team = await Team.getById(id);
    if (!team) return null;
    const newData = { ...team, ...newArr };
    const { rows } = await pool.query(
      'UPDATE teams SET name = $2, country = $3, league = $4, coach = $5 WHERE id = $1 RETURNING *;',
      [id, newData.name, newData.country, newData.league, newData.coach]
    );
    return new Team(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM teams WHERE id = $1 RETURNING *',
      [id]
    );
    return new Team(rows[0]);  }
}

module.exports = { Team };
