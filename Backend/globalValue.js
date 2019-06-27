const mysql = require("mysql");
exports.USER_LIST = null;
exports.SCHostIp = "1.246.219.187";
exports.connectDB = dbName => {
  var user = "infra";
  var password = "kjoisking2291";
  var connection = mysql.createConnection({
    host: "1.246.219.187",
    post: 3306,
    user: user,
    password: password,
    database: dbName,
    timezone: "utc",
    dateStrings: ["DATE", "DATETIME"] //timezone 설정
  });
  return connection;
};
