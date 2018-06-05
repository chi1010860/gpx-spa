// Runtime
document.body.onload = loadXML; //Don't delete this fucking line!!

// Config Block
document.getElementById("btnEnglishXML").onclick = EnglishSettingXML;
document.getElementById("btnChineseXML").onclick = ChineseSettingXML;
document.getElementById("btnEnglishJSON").onclick = EnglishSettingJSON;
document.getElementById("btnChineseJSON").onclick = ChineseSettingJSON;
var userTimer = setInterval(getUserTime, 1000);
document.getElementById("btnSidenavOpen").onclick = openSidenav;
document.getElementById("btnSidenavClose").onclick = closeSidenav;

///
/// WinPC32 Modules Control
///
for (var i = 1; i <= 8; i++) {
    var str = "portSwitch" + i;
    document.getElementById(str).onclick = toggleCheckbox;
}

document.getElementById("btnInit").onclick = initWinpc32;