var express = require('express')
var router = express.Router()
var cors = require('cors')
var corsOptions = require('./corsOptions')
var db = require('../model/db')
var sql = require('mssql')

// RESTful API for lightswitch
// GET /lightswitch 查詢全部
router.get('/lightswitch', cors(corsOptions), function (req, res, next) {
    sql.connect(db, function (err) {
        if (err)
            console.log(err)

        var request = new sql.Request()
        request.query("select * from LightSwitchState", function (err, result) {
            if (err) {
                console.log(err)
                res.send(err)
            }
            sql.close()
            res.send(result.recordset)
            console.log('result.recordset: ')
            console.log(result.recordset)
        })
    })
})

// GET /lightswitch/id 查詢一筆
router.get('/lightswitch/:id', cors(corsOptions), function (req, res, next) {
    sql.connect(db, function (err) {
        if (err)
            console.log(err)

        var request = new sql.Request()
        request.input('id', sql.Int, req.params.id)
            .query("select * from LightSwitchState where id=@id", function (err, result) {
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                sql.close()
                res.send(result.recordset[0])
                console.log('result.recordset[0]: ')
                console.log(result.recordset[0])
            })
    })
})

// GET /lightswitch/id 修改一筆
router.get('/lightswitch/:id/:isTurnOn', cors(corsOptions), function (req, res, next) {
    sql.connect(db, function (err) {
        if (err)
            console.log(err)

        var request = new sql.Request()
        request.input('id', sql.Int, req.params.id)
            .input('isTurnOn', sql.NVarChar, req.params.isTurnOn)
            .query("update LightSwitchState set isTurnOn=@isTurnOn where id=@id " +
                "select * from LightSwitchState", function (err, result) {
                    if (err) {
                        console.log(err)
                        res.send(err)
                    }
                    sql.close()
                    console.log(result.recordset)
                    res.send(result.recordset)
                })
    })
})

module.exports = router