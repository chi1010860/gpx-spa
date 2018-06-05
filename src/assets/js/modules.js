// All modules in the Web HMI

// AJAX XML
var EnglishSettingData = { EnData: [] };
var ChineseSettingData = { ChData: [] };
var languagesObject = {};

function loadXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/data/GlobalLanguages.xml", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getSettingData(this);
            console.log(this);
        }
    };
}

function getSettingData(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("EnglishData");
    for (i = 0; i < x[0].children.length; i++) {
        EnglishSettingData.EnData[i] = x[0].children[i].textContent;
    }
    var y = xmlDoc.getElementsByTagName("ChineseData");
    for (i = 0; i < y[0].children.length; i++) {
        ChineseSettingData.ChData[i] = y[0].children[i].textContent;
    }
}

var EnglishSetting = function () {
    for (var i = 1; i <= EnglishSettingData.EnData.length; i++) {
        var str = "lanSetting" + i.toString();
        var elmnt = document.getElementById(str);
        elmnt.innerHTML = EnglishSettingData.EnData[i - 1];
    }
}

var ChineseSetting = function () {
    for (var i = 1; i <= ChineseSettingData.ChData.length; i++) {
        var str = "lanSetting" + i.toString();
        var elmnt = document.getElementById(str);
        elmnt.innerHTML = ChineseSettingData.ChData[i - 1];
    }
}

// AJAX JSON
var loadJSON = function () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/data/GlobalLanguages.json", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            languagesObject = JSON.parse(this.responseText);
        }
    };
}

var EnglishSettingJSON = function () {
    loadJSON();
    for (var i = 1; i <= languagesObject.EnglishData.length; i++) {
        var str = "lanSetting" + i.toString();
        var elmnt = document.getElementById(str);
        elmnt.innerHTML = languagesObject.EnglishData[i - 1];
    }
}

var ChineseSettingJSON = function () {
    loadJSON();
    for (var i = 1; i <= languagesObject.ChineseData.length; i++) {
        var str = "lanSetting" + i.toString();
        var elmnt = document.getElementById(str);
        elmnt.innerHTML = languagesObject.ChineseData[i - 1];
    }
}

// ConfigBlock
var getUserTime = function () {
    var d = new Date();
    document.getElementById("timeBlock").innerHTML = d.toLocaleString();
}

var openSidenav = function () {
    document.getElementsByClassName("sidenav")[0].style.width = "200px";
}

var closeSidenav = function () {
    document.getElementsByClassName("sidenav")[0].style.width = "0";
}

// User Input
var DiscreteInput = {
    state: false,
    onclick: function () {
        var x = prompt('Please type "true" or "false"：', "true");
        if (x == "true") {
            DiscreteInput.state = true;
            inputDiscrete.value = x;
        }
        else if (x == "false") {
            DiscreteInput.state = false;
            inputDiscrete.value = x;
        }
        else {
            alert("Your input must be true or false.");
            inputDiscrete.value = "";
        }
    }
}

var AnalogChecker = {
    min: -100,
    max: 100,
    integerCheck: function () {
        checkRestriction(inputInt, AnalogChecker);
        var x = Number(inputInt.value);
        if (!Number.isInteger(x)) {
            alert("Your input must be an integer.");
            inputInt.value = "";
        }
    },
    floatCheck: function () {
        checkRestriction(inputFloat, AnalogChecker);
        if (inputFloat.value != "") {
            var x = Number(inputFloat.value);
            inputFloat.value = x.toFixed(2);
        }
    }
}

var checkRestriction = function (DOMObj, obj) {
    var str = DOMObj.value.trim();
    if (isNaN(Number(str)) == true || str.length == 0) {
        alert("Your input must be an Number.");
        DOMObj.value = "";
    }
    else {
        if (DOMObj.value > obj.max)
            DOMObj.value = obj.max;
        else if (DOMObj.value < obj.min)
            DOMObj.value = obj.min;
    }

}

var StringChecker = {
    data: "",
    checkString: function () {
        var str = prompt('Note that this input will be saved as a String：', 'NCTU');
        StringChecker.data = str.trim();
        inputString.value = StringChecker.data;
    }
}

// Color Control
var ColorChanger = {
    color: "#ffffff",
    fieldsetId: "buttonsBlock",
    oninput: function () {
        var x = document.getElementsByTagName("fieldset");
        for (var i = 0; i < x.length; i++) {
            x[i].style.background = bgColor.value;
        }

    }
}

// Slider
var HorizontalSlider = {
    min: 0,
    max: 100,
    data: 50,
    oninput: function () {
        min_H.value = HorizontalSlider.min;
        max_H.value = HorizontalSlider.max;
        HorizontalSlider.data = sliderHorizontal.value;
        outputHorizontalSlider.value = HorizontalSlider.data;
    }
}

var VerticalSlider = {
    min: 0,
    max: 100,
    data: 50,
    oninput: function () {
        min_V.value = VerticalSlider.min;
        max_V.value = VerticalSlider.max;
        VerticalSlider.data = sliderVertical.value;
        outputVerticalSlider.value = VerticalSlider.data;
    }
}

// Draggagle Element
function dragElement(elmnt, elmnt2) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var oriX = elmnt2.offsetLeft, oriY = elmnt2.offsetTop;
    if (document.getElementById(elmnt.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        // Depends on the width and height of "Planar"
        // X
        if (elmnt.offsetLeft + 1 < oriX) {
            elmnt.style.left = oriX + "px";
        }
        else if (elmnt.offsetLeft > oriX + 110 - 10) {
            elmnt.style.left = (oriX + 110 - 10) + "px";
        }
        else {
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        // Y
        if (elmnt.offsetTop < oriY) {
            elmnt.style.top = oriY + "px";
        }
        else if (elmnt.offsetTop > oriY + 110 - 10) {
            elmnt.style.top = (oriY + 110 - 10) + "px";
        }
        else {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        outputPlanarX.value = elmnt.offsetLeft - oriX;
        outputPlanarY.value = elmnt.offsetTop - oriY;
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Buttons
// Discrete
var ButtonDirect = {
    state: false,
    onclick: function () {
        ButtonDirect.state = true;
        outputDirect.value = "ON";
        document.getElementById("btnDirect").onmouseup = function () {
            ButtonDirect.state = false;
            outputDirect.value = "OFF";
        }
    }
}

var ButtonReverse = {
    state: true,
    onclick: function () {
        ButtonReverse.state = false;
        outputReverse.value = "OFF";
        document.getElementById("btnReverse").onmouseup = function () {
            ButtonReverse.state = true;
            outputReverse.value = "ON";
        }
    }
}

var ButtonToggle = {
    state: false,
    onclick: function () {
        ButtonToggle.state = !ButtonToggle.state;
        if (ButtonToggle.state)
            outputToggle.value = "ON";
        else outputToggle.value = "OFF";
    }
}

var ButtonSetting = {
    state: false,
    onSet: function () {
        ButtonSetting.state = true;
        outputSet.value = "ON";
    },
    onReset: function () {
        ButtonSetting.state = false;
        outputSet.value = "OFF";
    }
}

// Action
var ActionButton = {
    onmousedown: function () {
        outputMouse.value++;
    },
    onmouseup: function () {
        outputMouse.value++;
    },
    onmousemove: function () {
        outputMouse.value++;
    },
    onmouseover: function () {
        outputMouse.value++;
    },
    onmouseout: function () {
        outputMouse.value++;
    }
}

// Progress bar
function move() {
    var elem = document.getElementById("myBar");
    var output = document.getElementById("progressPercent")
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            output.value = width + '%';
        }
    }
}

// Light
var lightOn = function () {
    var elmnt = document.getElementById("outputLight");
    elmnt.style.background = "green";
}

var lightOff = function () {
    var elmnt = document.getElementById("outputLight");
    elmnt.style.background = "red";
}