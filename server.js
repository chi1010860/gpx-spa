// Import modules
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var cors = require('cors')
var corsOptions = require('./controller/corsOptions')
var PORT = process.env.PORT || 80

// Import API
var gpxApi = require('./controller/gpxApi.js')
var winpc32Api = require('./controller/winpc32Api.js')
var lightswitchApi = require('./controller/lightswitchApi.js')
var usersApi = require('./controller/usersApi.js')

// Build the Sever
server.listen(PORT, function (err) {
    if (err) throw err
    console.log('Server has been built on http://localhost:%d/', PORT)
    console.log('Get GPX object by API: http://localhost:%d/api/gpx', PORT)
})

// Parse POST request body as JSON
app.use(express.json())

// Handle http options method
app.options('/*', cors(corsOptions))

// Router for Front-end
app.use(express.static(__dirname + '/dist/'))

// Use all API
app.use(gpxApi)
app.use(winpc32Api)
app.use(lightswitchApi)
app.use(usersApi)

// WebSocket
// Namespace defination
var io_language = io.of('/language')
io.on('connection', function (socket) {
    socket.emit('first server emit', 'WebSocket has been connected.')
    socket.on('first event', function (data) {
        console.log(data)
    })
})

io_language.on('connection', socket => {
    socket.on('language toggle', function (data) {
        console.log(data)
        io_language.emit('language toggle', data)
    })
})
