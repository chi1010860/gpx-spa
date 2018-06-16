<template>
    <div class="container">
        <!--User Input Block-->
        <div class="block">
            <fieldset>
                <legend>Control</legend>
                <button class="gpx-button" @click="initWinpc32">初始化</button>
                <br />
                <button class="gpx-button" @click="Reduce">遞減</button>
                <button class="gpx-button" @click="Increase">遞增</button>
                <br />
                <div class="bit-watcher">
                    <span>Port {{ watchedBit }}:</span>
                    <span>{{ uValue }}</span>
                </div>
                <div>
                    <gpx-switch id="1" port-number="2048"></gpx-switch>
                    <gpx-switch id="2" port-number="2049"></gpx-switch>
                    <gpx-switch id="3" port-number="2050"></gpx-switch>
                    <gpx-switch id="4" port-number="2051"></gpx-switch>
                    <gpx-switch id="5" port-number="2052"></gpx-switch>
                    <gpx-switch id="6" port-number="2053"></gpx-switch>
                    <gpx-switch id="7" port-number="2054"></gpx-switch>
                    <gpx-switch id="8" port-number="2055"></gpx-switch>
                </div>
            </fieldset>
        </div>

    </div>
</template>

<script>
import gURL from '@/router/url.js'
import GpxSwitch from '@/components/ui/GpxSwitch'

export default {
    name: 'Winpc32',
    data() {
        return {
            watchedId: 9,
            watchedBit: 2091,
            uValue: 0
        }
    },
    methods: {
        initWinpc32() {
            var startTime = Date.now()
            console.log('Initail Start')
            var xhr = new XMLHttpRequest()
            var url = gURL + '/winpc32'
            xhr.open('POST', url, true)
            xhr.send()
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText)
                    var t = Date.now() - startTime
                    console.log('Spent time: %d', t)
                }
            }
        },
        Increase() {
            var vm = this
            var xhr = new XMLHttpRequest()
            var url = gURL + '/winpc32/add'
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    vm.uValue = JSON.parse(this.responseText).uValue
                    vm.getLightValue(vm.watchedId, vm.watchedBit, vm.uValue)
                }
            }
            xhr.open('POST', url, true)
            xhr.send()
        },
        Reduce() {
            var vm = this
            var xhr = new XMLHttpRequest()
            var url = gURL + '/winpc32/reduce'
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    vm.uValue = JSON.parse(this.responseText).uValue
                    vm.getLightValue(vm.watchedId, vm.watchedBit, vm.uValue)
                }
            }
            xhr.open('POST', url, true)
            xhr.send()
        },
        getLightValue(id, bit, value) {
            var vm = this
            var xhr = new XMLHttpRequest()
            var url = gURL + '/lightswitch/' + id
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var address = JSON.parse(this.responseText).Address
                    if (address == bit) {
                        vm.setLightValue(id, value)
                    }
                }
            }
            xhr.open('GET', url, true)
            xhr.send()
        },
        setLightValue(id, value) {
            var xhr = new XMLHttpRequest()
            var url = gURL + '/lightswitch/' + id + '/' + value
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(JSON.parse(this.responseText))
                }
            }
            xhr.open('GET', url, true)
            xhr.send()
        }
    },
    components: {
        GpxSwitch
    }
}
</script>

<style scoped>
fieldset {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 50%;
}
@media screen and (max-width: 500px) {
    fieldset {
        width: auto;
    }
}

legend {
    text-align: left;
    font-weight: bold;
}
.bit-watcher {
    margin: 10px;
}

.gpx-button {
    -moz-box-shadow: 3px 4px 0px 0px #899599;
    -webkit-box-shadow: 3px 4px 0px 0px #899599;
    box-shadow: 2px 2px 4px 0px #899599;
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0.05, #ededed),
        color-stop(1, #bab1ba)
    );
    background: -moz-linear-gradient(top, #ededed 5%, #bab1ba 100%);
    background: -webkit-linear-gradient(top, #ededed 5%, #bab1ba 100%);
    background: -o-linear-gradient(top, #ededed 5%, #bab1ba 100%);
    background: -ms-linear-gradient(top, #ededed 5%, #bab1ba 100%);
    background: linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#bab1ba',GradientType=0);
    background-color: #ededed;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    border-radius: 15px;
    border: 1px solid #d6bcd6;
    display: inline-block;
    cursor: pointer;
    color: #333;
    font-family: '微軟正黑體', 'Microsoft JhengHei', 'Segoe UI Semibold',
        'Segoe UI', 'Lucida Grande', Verdana, Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 7px 25px;
    margin: 5px;
}
.gpx-button:hover {
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0.05, #bab1ba),
        color-stop(1, #ededed)
    );
    background: -moz-linear-gradient(top, #bab1ba 5%, #ededed 100%);
    background: -webkit-linear-gradient(top, #bab1ba 5%, #ededed 100%);
    background: -o-linear-gradient(top, #bab1ba 5%, #ededed 100%);
    background: -ms-linear-gradient(top, #bab1ba 5%, #ededed 100%);
    background: linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#bab1ba', endColorstr='#ededed',GradientType=0);
    background-color: #bab1ba;
}
.gpx-button:active {
    position: relative;
    top: 1px;
    box-shadow: 0px 0px 0px 0px #899599;
}
</style>
