var express = require('express');
var router = express.Router();

var dbDao = require('../db/DBDao');
var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/showDetail', function (req, res) {

    dbDao.selectAllRows(function (error, result) {

        if (result) {
            console.log('回调结果' + result);

            res.render('detail', {
                dataRows: result,
                title: req.param('pagetype')
            });
        } else {
            res.render('error', {});
        }

    });

});

router.post('/addData', function (req, res, next){

    dbDao.insertDataForAdmin(req, res , next ,function(error, result){

        if (result){
            console.log('插入成功');
            //重新查询,渲染页面
            dbDao.selectAllRows(function (error, result) {

                if (result) {
                    console.log('回调结果' + result);

                    res.render('detail', {

                        dataRows: result,
                        title: req.param('pagetype')
                    });
                } else {
                    res.render('error', {});
                }

            });

        }

    });


});

router.get('/deleteData',function(req, res, next){

    dbDao.deleteDataForAdmin(req, res , next ,function(error, result){

        if (result){
            //console.log('删除成功');
            //重新查询,渲染页面
            dbDao.selectAllRows(function (error, result) {

                if (result) {
                    console.log('回调结果' + result);

                    res.render('detail', {
                        dataRows: result,
                        title: req.param('pagetype')
                    });
                } else {
                    res.render('error', {});
                }

            });

        }

    });
});

router.post('/updateData',function(req, res, next){

    dbDao.updateDataForAdmin(req, res , next ,function(error, result){

        if (result){

            //重新查询,渲染页面
            dbDao.selectAllRows(function (error, result) {

                if (result) {
                    console.log('回调结果' + result);

                    res.render('detail', {
                        dataRows: result,
                        title: req.param('pagetype')
                    });
                } else {
                    res.render('error', {});
                }

            });

        }

    });
});

module.exports = router;

