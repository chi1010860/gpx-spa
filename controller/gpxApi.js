var gpx = require('../model/gxml2json')
var express = require('express')
var cors = require('cors')
var corsOptions = require('./corsOptions')
var router = express.Router()

// Web API for GPX
router.get('/api/gpx', cors(corsOptions), function (req, res) {
    res.send(gpx)
})
router.get('/api/gpxDocument', cors(corsOptions), function (req, res) {
    res.send(gpx.gpxDocument)
})
router.get('/api/languagetable', cors(corsOptions), function (req, res) {
    res.send(gpx.languageTable)
})
router.get('/api/keyText', cors(corsOptions), function (req, res) {
    res.send(gpx.keyText)
})
router.get('/api/pageFrame', cors(corsOptions), function (req, res) {
    res.send(gpx.pageFrame)
})
router.get('/api/button', cors(corsOptions), function (req, res) {
    res.send(gpx.button)
})

module.exports = router