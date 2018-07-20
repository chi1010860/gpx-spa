// import modules
var edge = require('edge-js')
var fs = require('fs')

// Read the c# code of DllInvoke.dll
var readFilePath = 'D:/Programs/CSdll/Winpc32/Winpc32/DllInvoke.cs'
var writeFilePath = 'D:/Programs/VueProject/gpx-spa/model/DllInvoke.cs'
fs.readFile(readFilePath, (err, data) => {
    if (err) throw err
    fs.writeFile(writeFilePath, data, (err) => {
        if (err) throw err
    })
})

// 單獨測試此檔案時須注意路徑
// Functions invoke
var MyInitial = edge.func({
    assemblyFile: './HALNodeServer/Winpc32.dll',
    typeName: 'Winpc32.Startup',
    methodName: 'MyInitial'
})

var MyGetBit = edge.func({
    assemblyFile: './HALNodeServer/Winpc32.dll',
    typeName: 'Winpc32.Startup',
    methodName: 'MyGetBit'
})

var MySetBit = edge.func({
    assemblyFile: './HALNodeServer/Winpc32.dll',
    typeName: 'Winpc32.Startup',
    methodName: 'MySetBit'
})

var Get_A_Bit = edge.func({
    assemblyFile: './HALNodeServer/Winpc32.dll',
    typeName: 'Winpc32.Startup',
    methodName: 'Get_A_Bit'
})

var Set_A_Bit = edge.func({
    assemblyFile: './HALNodeServer/Winpc32.dll',
    typeName: 'Winpc32.Startup',
    methodName: 'Set_A_Bit'
})

var winpc32 = {
    MyInitial: function () {
        MyInitial(null, function (err, result) {
            if (err) {
                console.log('MyInitial Error:')
                throw err
            }
            // console.log("MyInitial Invoke:")
            // console.log(result)
        });
    },
    MyGetBit: function (getbitInput) {
        var jsResult;
        MyGetBit(getbitInput, function (err, result) {
            if (err) {
                console.log('MyGetBit Error:')
                throw err
            }
            // console.log("MyGetBit Invoke:")
            // console.log(result)
            jsResult = result
        });
        return jsResult
    },
    MySetBit: function (setbitInput) {
        MySetBit(setbitInput, function (err, result) {
            if (err) {
                console.log('MySetBit Error:')
                throw err
            }
            // console.log("MySetBit Invoke:")
            // console.log(result)
        });
    },
    Get_A_Bit: function (getbitInput) {
        var jsResult;
        Get_A_Bit(getbitInput, function (err, result) {
            if (err) {
                console.log('Get_A_Bit Error:')
                throw err
            }
            // console.log("Get_A_Bit Invoke:")
            // console.log(result)
            jsResult = result
        });
        return jsResult
    },
    Set_A_Bit: function (setbitInput) {
        Set_A_Bit(setbitInput, function (err, result) {
            if (err) {
                console.log('Set_A_Bit Error:')
                throw err
            }
            // console.log("Set_A_Bit Invoke:")
            // console.log(result)
        });
    }
}

module.exports = winpc32