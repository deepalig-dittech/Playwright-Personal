const { Client } = require('pg');

let client; // declare once

async function getDBClient() {
  if (!client) {
    client = new Client({
      host: '10.0.130.19',
      user: 'ditech_admin',
      password: 'mIHO7X80tcw6',
      database: 'edirra_db',
      port: 5432,
    });

    await client.connect();
  }
  return client;
}

module.exports = { getDBClient };
