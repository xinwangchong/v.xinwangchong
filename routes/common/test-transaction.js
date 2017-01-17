var db = require('./mysql.js');
var async = require('async');
db.getConnection(function(connection){
    connection.beginTransaction(function(err) {
        if (err) {
            console.log(err);
            return;
        }

        var task1 = function(callback){
            connection.query("insert into user (name) values('a')", function(err, result) {
                if (err) {
                    console.log(err);
                    callback(err,null);
                    return;
                }
                console.log('第一次插入成功!');
                callback(null,result);
            })
        }
        var task2 = function(callback){
            connection.query("insert into user (name) values('b')", function(err, result) {
                if (err) {
                    console.log(err);
                    callback(err,null);
                    return;
                }
                console.log('第二次插入成功!');
                callback(null,result);
            })
        }
        var task3 = function(callback){
            connection.query("insert into user (name) values('c')", function(err, result) {
                if (err) {
                    console.log(err);
                    callback(err,null);
                    return;
                }
                console.log('第三次插入成功!');
                callback(null,result);
            })
        }

        async.series([task1, task2, task3],function(err,result){
            if (err) {
                console.log(err);
                //回滚
                connection.rollback(function() {
                    console.log('出现错误,回滚!');
                    //释放资源
                    connection.release();
                });
                return;
            }
            //提交  
            connection.commit(function(err) {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log('成功,提交!');
                //释放资源
                connection.release();
            });
        })
    });
})