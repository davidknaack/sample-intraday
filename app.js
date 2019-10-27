#!/usr/bin/env node
const axios = require('axios');
const pg = require("pg");

const API_Key = process.env.API_KEY;
const API_URL = 'https://intraday.worldtradingdata.com/api/v1/intraday';
const symbol = 'SNAP';

const pool = new pg.Pool({
  host: 'localhost',
  port: 5433,
  database: 'postgres',
  user: 'auser',
  password: 'somepassword',
  connectionTimeoutMillis: 500,
});

main();

async function main() {
  // const res = await axios.get(`${API_URL}?symbol=${symbol}&range=1&interval=60&api_token=${API_Key}`);
  
  // fake return for testing
  const res = JSON.parse('{"symbol":"SNAP","stock_exchange_short":"NYSE","timezone_name":"America/New_York","intraday":{"2019-10-25 15:30:00":{"open":"13.93","close":"13.95","high":"13.97","low":"13.88","volume":"4364363"},"2019-10-25 14:30:00":{"open":"13.85","close":"13.93","high":"13.97","low":"13.81","volume":"2157029"},"2019-10-25 13:30:00":{"open":"13.95","close":"13.85","high":"14.00","low":"13.82","volume":"2189694"},"2019-10-25 12:30:00":{"open":"13.85","close":"13.95","high":"14.01","low":"13.84","volume":"3250520"},"2019-10-25 11:30:00":{"open":"13.85","close":"13.84","high":"13.88","low":"13.74","volume":"3484048"},"2019-10-25 10:30:00":{"open":"13.60","close":"13.84","high":"13.87","low":"13.57","volume":"5049770"},"2019-10-25 09:30:00":{"open":"13.42","close":"13.60","high":"13.67","low":"13.32","volume":"6882775"}}}');
  await save(res.symbol, res.intraday);

  pool.end();
  process.stdout.write('Done.\n');
  process.exit(0);
}

async function save(symbol, data){
  const client = await pool.connect();
  const keys = Object.keys(data);
  for(let i = 0; i< keys.length; i++){
    const vals = data[keys[i]];
    await client.query(
      'insert into intraday (symbol, data_time, close, high, low, open, volume) '+
      'VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [symbol, keys[i], vals.close, vals.high, vals.low, vals.open, vals.volume])
    .catch((err) => {
      process.stderr.write(err.stack);
    });
  }
  client.release();
}
