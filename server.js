// Import modules
var express = require('express')
var cors = require('cors')
var corsOptions = require('./controller/corsOptions')
var app = express()
var PORT = process.env.PORT || 80
var fs = require('fs')

// Import API
var usersApi = require('./controller/usersApi.js')
var winpc32Api = require('./controller/winpc32Api.js')
var lightswitchApi = require('./controller/lightswitchApi.js')
var gpxApi = require('./controller/gpxApi.js')

// TODO: move this session to a module
app.get('/gpxjson', (req, res) => {
    fs.readFile('./app_data/gpx.json', (err, data) => {
        if (err) throw err
        res.send(JSON.parse(data))
    })
})

// Parse request body as JSON
app.use(express.json())
// 给app配置bodyParser中间件

// Handle http options method
app.options('/*', cors(corsOptions))

// Router for Front-end
app.use(express.static(__dirname + '/dist/'))

// Use all API
app.use(usersApi)
app.use(winpc32Api)
app.use(lightswitchApi)
app.use(gpxApi)

app.listen(PORT, function (err) {
    if (err) throw err
    console.log('Server has been built on http://localhost:%d/', PORT)
    console.log('Get GPX object by API: http://localhost:%d/api/gpx', PORT)
})