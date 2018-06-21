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
            <gpx-hvline :rect="rect1"></gpx-hvline>
            <gpx-hvline :rect="rect2"></gpx-hvline>
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
            rect1: [[0, 75, 801, 77], [-1, 78, 800, 80]],
            rect2: [[0, 492, 800, 494], [-1, 495, 800, 497]]
        }
    },
    components: {
        GpxHvline
    },
    methods: {
        getGpxDocument: async function() {
            let URL = gURL + '/gpxdata/gpxDocument'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.drawWindow(result)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        getPageFrame: async function() {
            let URL = gURL + '/gpxdata/pageframe'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.drawButtonNavbar(result)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        getButton: async function() {
            let URL = gURL + '/gpxdata/button'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.drawButton(result)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        getKeyText: async function(btns, pData) {
            let URL = gURL + '/gpxdata/keytext'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.drawKeyText(result, btns, pData)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        drawWindow(data) {
            // define the color of main
            let main = document.getElementsByClassName('gpx')[0]
            main.style.backgroundColor = data.colorVoid

            // define the dimentions of PageFrame
            let pf = document.getElementsByClassName('page-frame')[0]
            pf.style.width = data.rect[2].toString() + 'px'
            pf.style.height = data.rect[3].toString() + 'px'
            pf.style.backgroundColor = data.colorPaper
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
            bn.style.backgroundColor = data[0].brushColor
        },
        drawButton(data) {
            // define the buttons
            let btns = document.getElementsByClassName('gpx-button')
            for (let i in data) {
                btns[i].style.width = data[i].width.toString() + 'px'
                btns[i].style.height = data[i].height.toString() + 'px'
                btns[i].style.backgroundColor = data[i].brushColor
                btns[i].style.border = '1px solid' + data[i].penColor
            }
            this.getKeyText(btns, data)
        },
        drawKeyText(data, arrTarget, pData) {
            for (let i = 0; i < arrTarget.length; i++) {
                let mi = pData[i].messageIndex
                let objKeyText = data.find(item => item.id === mi)
                arrTarget[i].innerHTML = objKeyText.original
            }
        }
    },
    created() {
        this.getGpxDocument()
        this.getPageFrame()
        this.getButton()
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