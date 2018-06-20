var gpx = require('../model/gxml2json')
var express = require('express')
var cors = require('cors')
var corsOptions = require('./corsOptions')
var router = express.Router()

// Web API for GPX
router.get('/gpxdata/gpx', cors(corsOptions), function (req, res) {
    res.send(gpx)
})
router.get('/gpxdata/gpxDocument', cors(corsOptions), function (req, res) {
    res.send(gpx.gpxDocument)
})
router.get('/gpxdata/languagetable', cors(corsOptions), function (req, res) {
    res.send(gpx.languageTable)
})
router.get('/gpxdata/keyText', cors(corsOptions), function (req, res) {
    res.send(gpx.keyText)
})
router.get('/gpxdata/pageFrame', cors(corsOptions), function (req, res) {
    res.send(gpx.pageFrame)
})
router.get('/gpxdata/button', cors(corsOptions), function (req, res) {
    res.send(gpx.button)
})

module.exports = router