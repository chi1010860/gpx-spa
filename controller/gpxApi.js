// import modules
var gpx = require('../model/gxml2json')
var express = require('express')
var cors = require('cors')
var corsOptions = require('./corsOptions')
var router = express.Router()

// Web API for GPX
router.get('/api/gpx', cors(corsOptions), function (req, res) {
    res.send(gpx)
})

// export module
module.exports = router