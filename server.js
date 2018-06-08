var gpx = require('./model/gxml2json')
var express = require('express')
var app = express()
var PORT = process.env.PORT || 80

var usersApi = require('./controller/usersApi.js')
var winpc32Api = require('./controller/winpc32Api.js')
var lightswitchApi = require('./controller/lightswitchApi.js')

app.use(express.static(__dirname + '/dist/'))
app.use('/images', express.static(__dirname + '/src/assets/images'))
app.use('/js', express.static(__dirname + '/src/assets/js'))
app.use('/data', express.static(__dirname + '/src/assets/data'))
app.use('/components', express.static(__dirname + '/src/components'))

app.use(usersApi)
app.use(winpc32Api)
app.use(lightswitchApi)

// GPX API
app.get('/keyText', function (req, res) {
    res.send(gpx.keyText)
})
app.get('/languagetable', function (req, res) {
    res.send(gpx.languageTable)
})
app.get('/gpx', function (req, res) {
    res.send(gpx)
})
// GPX API

app.listen(PORT, function (err) {
    if (err) throw err
    console.log("Server has been built on http://localhost:%d/", PORT)
    console.log("Get GPX object by API: http://localhost:%d/gpx", PORT)
    console.log("Get keytext by API: http://localhost:%d/keytext", PORT)
    console.log("Get languagetable by API: http://localhost:%d/languagetable", PORT)
})