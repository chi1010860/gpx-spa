// Runtime
document.body.onload = loadXML; //Don't delete this fucking line!!
//document.body.onload = loadJSON;

// Config Block
document.getElementById("btnEnglish").onclick = EnglishSetting;
document.getElementById("btnChinese").onclick = ChineseSetting;
document.getElementById("btnEnglishJSON").onclick = EnglishSettingJSON;
document.getElementById("btnChineseJSON").onclick = ChineseSettingJSON;
var userTimer = setInterval(getUserTime, 1000);
document.getElementById("btnSidenavOpen").onclick = openSidenav;
document.getElementById("btnSidenavClose").onclick = closeSidenav;

// User Input
document.getElementById("inputDiscrete").onclick = DiscreteInput.onclick;
document.getElementById("inputInt").onchange = AnalogChecker.integerCheck;
document.getElementById("inputFloat").onchange = AnalogChecker.floatCheck;
document.getElementById("inputString").onclick = StringChecker.checkString;

// Range Slider
document.getElementById("sliderHorizontal").oninput = HorizontalSlider.oninput;
document.getElementById("sliderVertical").oninput = VerticalSlider.oninput;
dragElement(document.getElementById("dbox"), document.getElementById("planar"));

// Buttons
document.getElementById("btnDirect").onmousedown = ButtonDirect.onclick;
document.getElementById("btnReverse").onmousedown = ButtonReverse.onclick;
document.getElementById("btnToggle").onclick = ButtonToggle.onclick;
document.getElementById("btnSet").onclick = ButtonSetting.onSet;
document.getElementById("btnReset").onclick = ButtonSetting.onReset;
document.getElementById("bgColor").oninput = ColorChanger.oninput;

// Action
document.getElementById("btnDown").onmousedown = ActionButton.onmousedown;
document.getElementById("btnUp").onmouseup = ActionButton.onmouseup;
document.getElementById("btnMove").onmousemove = ActionButton.onmousemove;
document.getElementById("btnOver").onmouseover = ActionButton.onmouseover;
document.getElementById("btnOut").onmouseout = ActionButton.onmouseout;

// Light
document.getElementById("btnLightOn").onclick = lightOn;
document.getElementById("btnLightOff").onclick = lightOff;