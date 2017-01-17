// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '120.27.93.125',
    user: 'root',
    password: 'jinglun578926',
    database: 'xinwangchong'
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            callback(err, result);
            connection.release();//释放链接
        });
    });
}
exports.query = query;