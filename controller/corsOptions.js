// CORS (Cross-Origin Resource Sharing) Setting
var corsOptions = {
    origin: [
        'http://localhost',
        'http://localhost:8081',
        'http://192.168.2.177'
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = corsOptions