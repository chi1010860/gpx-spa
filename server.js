var express = require('express')
var app = express()
var port = process.env.PORT || 80

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

app.listen(port, function () {
    console.log("Server has been built on http://localhost:80/");
})