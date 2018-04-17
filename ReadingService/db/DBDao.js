// 操作数据库


var mysql = require('mysql');
var sqlList = require('./DBSqlList');
// var assert = require('assert');


//创建数据库连接池
var pool = mysql.createPool({

    //测试数据库
    host: 'localhost',
    user: 'root',
    password: 'a123456',
    database: 'mydb',
    port: 3306

    //生产数据库
    // host: '58d2980965115.sh.cdb.myqcloud.com',
    // user: 'cdb_outerroot',
    // password: 'song12345678',
    // database: 'jinweisDB',
    // port: 3942

});


//返回客户端的数据 json
var formatData = function (res, jsonString) {

    if (typeof res === 'undefinded') {
        resp.json({
            msg: '数据返回失败',
            code: 0
        });
    } else
        res.json(jsonString);

};

module.exports = {

    //客户端 API

    selectAllRowsData: function (req, res, next) {

        pool.getConnection(function (error, connection) {

            if (error) {
                throw error;
                console.log('获取数据库连接失败');
                return;
            }

            connection.query(sqlList.selectAllRowsData, function (error, result) {

                if (error) {
                    throw error;
                    console.log('查询失败', error);
                    return;
                }
                //assert.ifError(error);
                if (result) {
                    console.log(result);

                    result = {
                        result: result,
                        msg: '查询成功',
                        code: 200
                    }

                }
                formatData(res, result);

                connection.release();

            });

        });
    },
    insertData: function (req, res, next) {

        pool.getConnection(function (error, connection) {

            if (error) {
                throw error;
                console.log('获取数据库连接失败');
                return;
            }
            //获取请求参数
            var param = req.query || req.params;

            // insert into readinglist (title, subtitle, iconUrl, createTime, editTime) values (?,?,?,?,?)
            connection.query(sqlList.insertData, [param.title, param.subtitle, param.iconUrl, param.createTime], function (error, result) {

                if (error) {
                    throw error;
                    console.log('新增失败', error);
                    return;
                }
                // assert.ifError(error);
                if (result) {

                    result = {
                        msg: '新增成功',
                        code: 200
                    }

                }
                formatData(res, result);

                connection.release();

            });

        });
    },
    deleteData: function (req, res, next) {
        pool.getConnection(function (error, connection) {
            if (error) {
                throw error;
                console.log('数据库连接失败');
                return;
            }
            var param = req.query || req.params;
            connection.query(sqlList.deleteData, [param.rid], function (error, result) {
                if (error) {
                    throw error;
                    console.log('删除失败');
                    return;
                }

                if (result.affectedRows > 0) {

                    result = {
                        result: result,
                        msg: ' 删除成功',
                        code: 200
                    }

                } else {

                    result = {

                        msg: ' 删除失败',
                        code: 406
                    }
                }
                formatData(res, result);

                connection.release();
            })
        })
    },
    updateData: function (req, res, next) {
        pool.getConnection(function (error, connection) {
            if (error) {
                throw error;
                console.log('数据库连接失败' + error.message);
                return;

            }
            var params = req.query || req.params;

            //update readinglist set title = ?, subtitle = ?, iconUrl = ?, editTime = ? where  rid = ?
            connection.query(sqlList.updateData, [param.title, param.subtitle, param.iconUrl, param.editTime, param.rid], function (error, result) {

                if (error) {
                    throw error;
                    console.log('更新失败' + error.message);
                    return;
                }

                if (result.affectedRows > 0) {
                    console.log(result);

                    result = {
                        result: result,
                        msg: '更新成功',
                        code: 200
                    }

                }

            })
        })
    },

    //后台 API

    selectAllRows: function (cb) {

        pool.getConnection(function (error, connection) {

            if (error) {

                console.log('获取数据库连接失败');
                throw error;
                // return;
            }

            connection.query(sqlList.selectAllRowsData, function (error, result) {

                if (error) {

                    console.log('查询失败');
                    throw error;
                    // return '查询失败';
                }
                if (result) {


                    // result = {
                    //     result:result,
                    //     msg: '查询成功',
                    //     code: 200
                    // }

                    try {
                        //result = JSON.stringify(result);
                    } catch (e) {

                        if (e) {
                            console.log(e.stack);
                        }
                    }
                    cb(error, result);


                }
                connection.release();
            });

        });
    },
    insertDataForAdmin: function (req, res, next, cb) {

        pool.getConnection(function (error, connection) {

            if (error) {


                console.log('获取数据库连接失败');
                throw  error;
                // return;
            }
            //获取请求参数
            var param = req.body;

            console.log('参数为:' + param.title, param.subtitle, param.iconUrl);
            var date = new Date();
            // insert into readinglist (title, subtitle, iconUrl,createtime) values (?,?,?,?)
            connection.query(sqlList.insertData, [param.title, param.subtitle, param.iconUrl,date], function (error, result) {
                console.log('插入开始');
                if (error) {

                    console.log('新增失败');
                    throw error;
                    // return;
                }
                // assert.ifError(error);
                if (result) {

                    // result = {
                    //     msg: '新增成功',
                    //     code: 200
                    // }

                    cb(req, res, error, result);

                }
                //formatData(res, result);

                connection.release();

            });

        });
    },
    deleteDataForAdmin: function (req, res, next, cb) {

        pool.getConnection(function (error, connection) {

            if (error) {

                throw  error;
                console.log('获取数据库连接失败');
                //return;
            }
            //获取请求参数
            var param = req.param('rid');

            console.log('参数为:' + param);

            var comma = ',';
            if (param.indexOf(comma) < 0) {

                console.log('删除多个');//删除单个

                connection.query(sqlList.deleteData, param, function (error, result) {

                    console.log('删除开始');
                    if (error) {

                        throw  error;
                        console.log('删除失败', error);
                        //return;
                    }

                    if (result) {

                        // result = {
                        //     msg: '新增成功',
                        //     code: 200
                        // }
                        cb(error, result);

                    }
                    connection.release();

                });

            }
            else {
                console.log('删除多个');//删除多个

                var itemsCount = 0;

                var items = param.split(',');

                for (var i = 0; i < items.length; i++) {

                    //console.log('参数是一个数组' +param.length + "-----" + param[i].rid);

                    connection.query(sqlList.deleteData, items[i], function (error, result) {

                        console.log('删除开始' + i);
                        if (error) {

                            throw error;
                            console.log('删除失败', error);
                            //return;
                        }

                        if (result) {

                            // result = {
                            //     msg: '新增成功',
                            //     code: 200
                            // }

                            itemsCount++;
                            console.log(itemsCount + '==========');
                            if (itemsCount == items.length) {


                                console.log('循环' + i);
                                cb(req, res, error, result);

                                connection.release();
                            }
                        }

                    });
                }
            }


        });
    },
    updateDataForAdmin: function (req, res, next, cb) {

        pool.getConnection(function (error, connection) {

            if (error) {


                console.log('获取数据库连接失败');
                throw  error;
                // return;
            }
            //获取请求参数
            var param = req.body || req.params;


            var date = new Date();

            // 'update readinglist set title = ?, subtitle = ?, iconUrl = ?, editTime = ? where  rid = ?'
            connection.query(sqlList.updateData, [param.editTitle, param.editSubtitle, param.editIconUrl,date,param.rid], function (error, result) {
                console.log('插入开始');
                if (error) {

                    console.log('新增失败');
                    throw error;
                    // return;
                }
                // assert.ifError(error);
                if (result) {

                    // result = {
                    //     msg: '新增成功',
                    //     code: 200
                    // }

                    cb(req, res, error, result);

                }
                //formatData(res, result);

                connection.release();

            });

        });
    }

}

