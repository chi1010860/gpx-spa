var express = require('express')
var cors = require('cors')
var corsOptions = require('./controller/corsOptions')
var app = express()
var PORT = process.env.PORT || 80

// Import API
var usersApi = require('./controller/usersApi.js')
var winpc32Api = require('./controller/winpc32Api.js')
var lightswitchApi = require('./controller/lightswitchApi.js')
var gpxApi = require('./controller/gpxApi.js')

// Parse request body as JSON
app.use(express.json())

// Handle http options method
app.options('/*', cors(corsOptions))

// Basic Router for front-end
app.use(express.static(__dirname + '/dist/'))
app.use('/images', express.static(__dirname + '/src/assets/images'))
app.use('/js', express.static(__dirname + '/src/assets/js'))
app.use('/data', express.static(__dirname + '/src/assets/data'))
app.use('/components', express.static(__dirname + '/src/components'))

// Use all API
app.use(usersApi)
app.use(winpc32Api)
app.use(lightswitchApi)
app.use(gpxApi)

app.listen(PORT, function (err) {
    if (err) throw err
    console.log("Server has been built on http://localhost:%d/", PORT)
    console.log("Get GPX object by API: http://localhost:%d/api/gpx", PORT)
})