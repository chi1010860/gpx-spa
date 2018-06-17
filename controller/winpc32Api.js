var express = require('express')
var cors = require('cors')
var corsOptions = require('./corsOptions')
var router = express.Router()
var winpc32 = require('../model/winpc32.js')

// Web API for winpc32
// POST /winpc32
router.post('/winpc32', cors(corsOptions), function (req, res) {
    winpc32.MyInitial()
    var uValue;
    for (let bit = 2048; bit <= 2100; bit++) {

        let getbitInput = {
            address: bit
        }

        let uValue = winpc32.MyGetBit(getbitInput);

        if (uValue != 0) {
            uValue = 0;
            let setbitInput = {
                address: bit,
                value: uValue
            }

            winpc32.MySetBit(setbitInput)
        }
    }

    console.log("Initial completed")
    res.send("Initial completed")
});

// POST /winpc32/add
router.post('/winpc32/add', cors(corsOptions), function (req, res) {
    let watchBit = 2091
    let getbitInput = {
        address: watchBit
    }

    let uValue = winpc32.MyGetBit(getbitInput)
    uValue++

    let setbitInput = {
        address: watchBit,
        value: uValue
    }

    winpc32.MySetBit(setbitInput)
    uValue = winpc32.MyGetBit(getbitInput)
    let data = { uValue: uValue }

    console.log(data)
    res.send(data)
});

// POST /winpc32/reduce
router.post('/winpc32/reduce', cors(corsOptions), function (req, res) {
    let watchBit = 2091
    let getbitInput = {
        address: watchBit
    }

    let uValue = winpc32.MyGetBit(getbitInput)
    uValue--

    let setbitInput = {
        address: watchBit,
        value: uValue
    }

    winpc32.MySetBit(setbitInput)
    uValue = winpc32.MyGetBit(getbitInput)
    let data = { uValue: uValue }

    console.log(data)
    res.send(data)
});

// GET /winpc32/light-switch/id
router.get('/winpc32/light-switch/:id', cors(corsOptions), function (req, res) {
    let nAddress
    let id = req.params.id;
    let idSet = [1, 2, 3, 4, 5, 6, 7, 8]
    let lightSet = []
    for (let bit = 2048; bit <= 2055; bit++) {
        lightSet.push(bit)
    }

    for (let i = 0; i <= 7; i++) {
        if (id == idSet[i])
            nAddress = lightSet[i]
    }

    let getbitInput = {
        address: nAddress
    }

    let bValue = winpc32.MyGetBit(getbitInput)
    if (bValue == 0 || bValue == 1) {
        if (bValue == 0) {
            bValue = 1
        }
        else if (bValue == 1) {
            bValue = 0
        }
    }
    else { bValue = 0; }

    console.log(bValue)

    let setbitInput = {
        address: nAddress,
        value: bValue
    }

    winpc32.MySetBit(setbitInput)
    bValue = winpc32.MyGetBit(getbitInput)
    let data = { bValue: bValue }

    console.log(data)
    res.send(data)
});

module.exports = router