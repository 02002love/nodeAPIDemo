//操作数据库的 SQL 语句

var sqlList = {

    //CRUD
    //增
    insertData : 'insert into readinglist (title, subtitle, iconUrl,createTime) values (?,?,?,?)',
    //删
    deleteData : 'delete from readinglist where rid = ?',
    //改
    updateData : 'update readinglist set title = ?, subtitle = ?, iconUrl = ?, editTime = ? where  rid = ?',
    //查
    selectSingleRowData : 'select * from readinglist where title = ?',

    selectAllRowsData : 'select * from readinglist'

};

module.exports = sqlList;