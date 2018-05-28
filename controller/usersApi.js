var express = require('express');
var router = express.Router();
var db = require('../model/db');
var sql = require('mssql');

// RESTful API for users
// GET /users 查詢全部
router.get('/users', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var request = new sql.Request();
        request.query("select * from UserList", function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            sql.close();
            res.send(result.recordset);
            console.log('result.recordset: ');
            console.log(result.recordset);
        });

    });
});

// GET /users/id 查詢一筆
router.get('/users/:id', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var request = new sql.Request();
        request.input('id', sql.Int, req.params.id)
            .query("select * from UserList where id=@id", function (err, result) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                sql.close();
                res.send(result.recordset[0]);
                console.log('result.recordset[0]: ');
                console.log(result.recordset[0]);
            });

    });
});

// POST /users 新增一筆
router.post('/users', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var u = {
            UserAccount: 'insert@abc.com',
            UserName: 'Insert'
        };

        var request = new sql.Request();
        request.query("insert into UserList (UserAccount, Username) values('" +
            u.UserAccount + "', '" + u.UserName + "') " +
            "select * from UserList",
            function (err, result) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                sql.close();
                console.log(result.recordset);
                res.send(result.recordset);
            });
    });
});

// PATCH /users/id 修改一筆
router.patch('/users/:id', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var u = {
            UserAccount: 'update@yahoo.com',
            UserName: 'Update'
        }

        var request = new sql.Request();
        request.input('id', sql.Int, req.params.id)
            .query("update UserList set UserAccount='" + u.UserAccount +
                "', UserName='" + u.UserName + "' where id=@id " +
                "select * from UserList", function (err, result) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    sql.close();
                    console.log(result.recordset);
                    res.send(result.recordset);
                });
    });
});

// DELETE /users/id 刪除一筆
router.delete('/users/:id', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err)
            console.log(err);

        var request = new sql.Request();
        request.input('id', sql.Int, req.params.id)
            .query("delete UserList where id=@id " +
                "select * from UserList", function (err, result) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    sql.close();
                    console.log(result.recordset);
                    res.send(result.recordset);
                });
    });
});

module.exports = router;