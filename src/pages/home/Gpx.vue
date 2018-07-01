<template>
    <div class="gpx">
        <div class="page-frame">
            <div class="window">
                <router-view></router-view>
            </div>
            <div class="button-navbar">
                <router-link class="gpx-button" :to="{name: 'window1'}" exact></router-link>
                <router-link class="gpx-button" :to="{name: 'window2'}" exact></router-link>
                <router-link class="gpx-button" :to="{name: 'window3'}" exact></router-link>
                <router-link class="gpx-button" :to="{name: 'window4'}" exact></router-link>
                <router-link class="gpx-button" :to="{name: 'window5'}" exact></router-link>
            </div>
            <gpx-hvline :rect="hvline"></gpx-hvline>
        </div>
    </div>
</template>

<script>
import gURL from '@/router/url.js'
import GpxHvline from '@/components/gpx_ui/GpxHVLine'

export default {
    name: 'PageFrame',
    data() {
        return {
            keytext: [],
            language: 'original',
            hvline: [[0, 492, 800, 494], [-1, 495, 800, 497]]
        }
    },
    components: {
        GpxHvline
    },
    methods: {
        getGpxInit: async function() {
            let URL = gURL + '/gpxdata/gpx'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.drawWindow(result['gpx:document'])
                this.drawButtonNavbar(result['gpx:object'].PageFrame)
                this.drawButton(result['gpx:object']._Button)
                this.getKeyText(result['style-sheet']['key-text'])
                this.drawMSG(result['gpx:object'].MSG)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        getKeyText(data) {
            for (let i in data) {
                this.keytext.push(data[i])
            }
        },
        drawWindow(data) {
            // define the color of main
            let main = document.getElementsByClassName('gpx')[0]
            main.style.backgroundColor = '#' + data['color-void']

            // define the dimentions of PageFrame
            let pf = document.getElementsByClassName('page-frame')[0]
            pf.style.width = data.rect[2].toString() + 'px'
            pf.style.height = data.rect[3].toString() + 'px'
            pf.style.backgroundColor = '#' + data['color-paper']
        },
        drawButtonNavbar(data) {
            // computed the size of ButtonNavbar and window
            let winWidth = data[0].rect[2]
            let winHeight = data[0].rect[1]
            let bnWidth = data[0].rect[2] - data[0].rect[0]
            let bnHeight = data[0].rect[3] - data[0].rect[1]

            // define the window
            let win = document.getElementsByClassName('window')[0]
            win.style.width = winWidth.toString() + 'px'
            win.style.height = winHeight.toString() + 'px'

            // define the ButtonNavbar
            let bn = document.getElementsByClassName('button-navbar')[0]
            bn.style.width = bnWidth.toString() + 'px'
            bn.style.height = bnHeight.toString() + 'px'
            console.log(data)
            bn.style.backgroundColor = '#' + data[0]['brush-color']
        },
        drawButton(data) {
            // define the buttons
            let btns = document.getElementsByClassName('gpx-button')
            for (let i = 0; i < btns.length; i++) {
                let width = data[i].rect[2] - data[i].rect[0]
                let height = data[i].rect[3] - data[i].rect[1]
                btns[i].style.width = width.toString() + 'px'
                btns[i].style.height = height.toString() + 'px'
                btns[i].style.backgroundColor = '#' + data[i]['brush-color']
                btns[i].style.border = '1px solid ' + '#' + data[i]['pen-color']
            }
        },
        drawMSG(data) {
            let btns = document.getElementsByClassName('gpx-button')
            for (let i = 0; i < btns.length; i++) {
                let mi = data[i].MessageIndex[0].message
                let text = this.keytext.find(item => item.id === mi)
                btns[i].innerHTML = text[this.language]
            }
        }
    },
    created() {
        this.getGpxInit()
    }
}
</script>

<style>
.gpx {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}
.page-frame {
    position: relative;
    width: 100px;
    height: 100px;
}
.window {
    width: 100%;
}
.button-navbar {
    display: flex;
    text-align: left;
    padding-left: 10px;
    padding-top: 10px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.gpx-button {
    margin-right: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-align: center;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
</style>