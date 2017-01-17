/*
 nodejs连接mysql数据库支持事物封装
 */
var db    = {};
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : '120.27.93.125',
    user            : 'root',
    password        : 'jinglun578926',
    database        : 'xinwangchong'
});
//获取连接
db.getConnection = function(callback){
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(null);
            return;
        }
        callback(connection);
    });
}
module.exports = db;