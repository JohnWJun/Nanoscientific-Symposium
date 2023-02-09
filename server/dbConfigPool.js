const fs = require("fs");

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

const commonPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "common",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});

const asiaPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "asia",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});

const koreaPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "korea",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});
const japanPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "japan",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});
const usPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "us",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});
const europePool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "europe",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});
const chinaPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "china",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});

module.exports.commonPool = commonPool;
module.exports.asiaPool = asiaPool;
module.exports.koreaPool = koreaPool;
module.exports.japanPool = japanPool;
module.exports.usPool = usPool;
module.exports.europePool = europePool;
module.exports.chinaPool = chinaPool;
