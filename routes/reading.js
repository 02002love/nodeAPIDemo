var express = require('express');
var router = express.Router();

var dbDao = require('../db/DBDao')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/selectAllRowsData',function (req, res, next) {
    console.log('查询全部的数据');

    dbDao.selectAllRowsData(req,res,next);

});

router.get('/insertData',function (req, res, next) {
    console.log('查询全部的数据');

    dbDao.insertData(req,res,next);

});

router.get('/deleteData', function (req, res, next) {
    console.log('删除数据');

    dbDao.deleteData(req, res, next);
});

router.post('/updateData', function (req, res, next) {
    console.log('更新数据');

    dbDao.updateData(req, res, next);
})

module.exports = router;
