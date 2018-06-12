<template>
	<button @click="EnglishSetting">{{ MSG }}</button>
</template>

<script>
export default {
    name: 'GpxButton',
    data() {
        return {
            MSG: 'User Input',
            url: '../static/ControlLink.xml',
            //   url: "../static/GlobalLanguages.xml",
            EnglishSettingData: { EnData: [] },
            ChineseSettingData: { ChData: [] }
        }
    },
    methods: {
        loadXML() {
            var vm = this
            var xhttp = new XMLHttpRequest()
            xhttp.open('GET', vm.url, true)
            xhttp.send()
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this)
                    //   vm.getSettingData(this);
                    var xmlDoc = this.responseXML
                    console.log(xmlDoc)
                }
            }
        },
        getSettingData(xml) {
            var vm = this
            var i
            var xmlDoc = xml.responseXML
            console.log(xmlDoc)
            var x = xmlDoc.getElementsByTagName('EnglishData')
            for (i = 0; i < x[0].children.length; i++) {
                vm.EnglishSettingData.EnData[i] = x[0].children[i].textContent
            }
            var y = xmlDoc.getElementsByTagName('ChineseData')
            for (i = 0; i < y[0].children.length; i++) {
                vm.ChineseSettingData.ChData[i] = y[0].children[i].textContent
            }
            console.log(vm.ChineseSettingData)
            console.log(vm.EnglishSettingData)
        },
        EnglishSetting() {
            var vm = this
            vm.loadXML()
            for (var i = 1; i <= vm.EnglishSettingData.EnData.length; i++) {
                var str = 'lanSetting' + i.toString()
                var elmnt = document.getElementById(str)
                elmnt.innerHTML = vm.EnglishSettingData.EnData[i - 1]
            }
        },
        ChineseSetting() {
            for (var i = 1; i <= vm.ChineseSettingData.ChData.length; i++) {
                var str = 'lanSetting' + i.toString()
                var elmnt = document.getElementById(str)
                elmnt.innerHTML = vm.ChineseSettingData.ChData[i - 1]
            }
        },
        loadJSON() {
            var xmlhttp = new XMLHttpRequest()
            xmlhttp.open('GET', '/data/GlobalLanguages.json', true)
            xmlhttp.send()
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    languagesObject = JSON.parse(this.responseText)
                }
            }
        },
        EnglishSettingJSON() {
            loadJSON()
            for (var i = 1; i <= languagesObject.EnglishData.length; i++) {
                var str = 'lanSetting' + i.toString()
                var elmnt = document.getElementById(str)
                elmnt.innerHTML = languagesObject.EnglishData[i - 1]
            }
        },
        ChineseSettingJSON() {
            loadJSON()
            for (var i = 1; i <= languagesObject.ChineseData.length; i++) {
                var str = 'lanSetting' + i.toString()
                var elmnt = document.getElementById(str)
                elmnt.innerHTML = languagesObject.ChineseData[i - 1]
            }
        }
    }
}
</script>

<style scoped>
button {
    width: 100px;
    height: 100px;
}
</style>
