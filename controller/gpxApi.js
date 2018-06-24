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
    res.send(gpx["gpx:document"])
})
router.get('/gpxdata/languagetable', cors(corsOptions), function (req, res) {
    res.send(gpx["style-sheet"]["language-table"])
})
router.get('/gpxdata/keyText', cors(corsOptions), function (req, res) {
    res.send(gpx["style-sheet"]["key-text"])
})
router.get('/gpxdata/pageFrame', cors(corsOptions), function (req, res) {
    res.send(gpx["gpx:object"].PageFrame)
})
router.get('/gpxdata/button', cors(corsOptions), function (req, res) {
    res.send(gpx["gpx:object"]._Button)
})

module.exports = router