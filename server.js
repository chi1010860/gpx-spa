// Import modules
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var cors = require('cors')
var corsOptions = require('./controller/corsOptions')
var winpc32 = require('./model/winpc32.js')
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
var io_window = io.of('/window')
var io_switchRk = io.of('/switchRk')
var io_button = io.of('/button')
var io_userinput = io.of('/userinput')
var io_slider = io.of('/slider')

// Handler
io.on('connection', function (socket) {
    socket.emit('first server emit', 'WebSocket has been connected.')
    socket.on('first event', function (data) {
        console.log(data)
    })
})
io_language.on('connection', socket => {
    socket.on('languageCall', function (data) {
        io_language.emit('language toggle', data)
    })
})
io_window.on('connection', socket => {
    socket.on('windowCall', data => {
        io_window.emit('windowHide')
        io_window.emit('windowShow', {
            windowName: data.windowName
        })
    })
})
io_switchRk.on('connection', socket => {
    socket.on('switchRkCall', data => {
        io_switchRk.emit('switchRk toggle', data)
    })
})
io_button.on('connection', socket => {
    socket.on('buttonCall', data => {
        io_button.emit('buttonUpdate' + data.uTagname, data)
    })
    socket.on('PB-action call', data => {
        io_button.emit('PB-action update', data)
    })
})
io_userinput.on('connection', socket => {
    socket.on('userinput-discrete call', data => {
        if (data.discreteValue == true) {
            io_userinput.emit('userinput-discrete ON', data)
        } else {
            io_userinput.emit('userinput-discrete OFF', data)
        }
    })
    socket.on('userinput-analog call', data => {
        io_userinput.emit('userinput-analog update', data)

    })
    socket.on('userinput-string call', data => {
        io_userinput.emit('userinput-string update', data)
    })
})
io_slider.on('connection', socket => {
    socket.on('sliderCall', data => {
        io_slider.emit('sliderUpdate' + data.uTagname, data)

        winpc32.MySetBit({
            address: data.uTagname,
            value: parseInt(data.analogValue)
        })
    })
})
