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
var MyGetBit = edge.func({
    assemblyFile: './HALNodeServer/Winpc32.dll',
    typeName: 'Winpc32.Startup',
    methodName: 'MyGetBit'
});

var MySetBit = edge.func({
    assemblyFile: './HALNodeServer/Winpc32.dll',
    typeName: 'Winpc32.Startup',
    methodName: 'MySetBit'
});

var MyInitial = edge.func({
    assemblyFile: './HALNodeServer/Winpc32.dll',
    typeName: 'Winpc32.Startup',
    methodName: 'MyInitial'
});

var winpc32 = {
    MyInitial: function () {
        MyInitial(null, function (err, result) {
            if (err) {
                console.log('MyInitial Error:')
                throw err
            }
            // console.log("MyInitial Invoke:");
            // console.log(result);
        });
    },
    MyGetBit: function (getbitInput) {
        var jsResult;
        MyGetBit(getbitInput, function (err, result) {
            if (err) {
                console.log('MyInitial Error:')
                throw err
            }
            // console.log("MyGetBit Invoke:")
            // console.log(result);
            jsResult = result
        });
        return jsResult
    },
    MySetBit: function (setbitInput) {
        MySetBit(setbitInput, function (err, result) {
            if (err) {
                console.log('MyInitial Error:')
                throw err
            }
            // console.log("MySetBit Invoke:")
            // console.log(result);
        });
    }
}

module.exports = winpc32

