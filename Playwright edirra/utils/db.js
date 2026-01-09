import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: '10.0.130.19',
  port: 5432,
  database: 'edirra_db',
  user: 'ditech_admin',
  password: 'mIHO7X80tcw6',
});

export async function queryDB(query, params = []) {
  const result = await pool.query(query, params);
  return result.rows;
}
