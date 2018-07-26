<template>
    <div class="gpx">
        <div class="page-frame">
            <gpx-title></gpx-title>
            <gpx-clock></gpx-clock>
            <gpx-language></gpx-language>

            <div class="window">
                <!-- <router-view></router-view> -->
                <vm-loading v-if="isLoading"></vm-loading>
                <gpx-window-void v-show="showWindow.void && !isLoading"></gpx-window-void>
                <gpx-window-1 v-show="showWindow.window1"></gpx-window-1>
                <gpx-window-2 v-show="showWindow.window2"></gpx-window-2>
                <gpx-window-3 v-show="showWindow.window3"></gpx-window-3>
                <gpx-window-4 v-show="showWindow.window4"></gpx-window-4>
                <gpx-window-5 v-show="showWindow.window5"></gpx-window-5>
            </div>

            <gpx-button-navbar></gpx-button-navbar>
            <gpx-hvline :rect="hvline1" v-show="!isLoading"></gpx-hvline>
            <gpx-hvline :rect="hvline2" v-show="!isLoading"></gpx-hvline>
        </div>
    </div>
</template>

<script>
import gURL from '@/router/url.js'
import VmLoading from '@/components/ui/Loading'
import GpxTitle from '@/components/gpx_ui/GpxTitle'
import GpxClock from '@/components/gpx_ui/GpxClock'
import GpxLanguage from '@/components/gpx_ui/GpxLanguage'
import GpxWindowVoid from '@/components/gpx_window/Void'
import GpxWindow1 from '@/components/gpx_window/window1'
import GpxWindow2 from '@/components/gpx_window/window2'
import GpxWindow3 from '@/components/gpx_window/window3'
import GpxWindow4 from '@/components/gpx_window/window4'
import GpxWindow5 from '@/components/gpx_window/window5'
import GpxButtonNavbar from '@/components/gpx_ui/GpxButtonNavbar'
import GpxPageButton from '@/components/gpx_ui/GpxPageButton'
import GpxHvline from '@/components/gpx_ui/GpxHVLine'
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'

var socket = io.connect(gURL)
var io_window = io.connect(gURL + '/window')

export default {
    data() {
        return {
            pageButton: [],
            hvline1: [[0, 75, 801, 77], [-1, 78, 800, 80]],
            hvline2: [[0, 492, 800, 494], [-1, 495, 800, 497]],
            isLoading: false,
            showWindow: {
                void: true,
                window1: false,
                window2: false,
                window3: false,
                window4: false,
                window5: false
            }
        }
    },
    computed: {
        ...mapGetters({
            keytext: 'getKeytext',
            language: 'getLanguage',
            fontStyle: 'getFontStyle'
        })
    },
    components: {
        'vm-loading': VmLoading,
        'gpx-title': GpxTitle,
        'gpx-clock': GpxClock,
        'gpx-language': GpxLanguage,
        'gpx-window-void': GpxWindowVoid,
        'gpx-window-1': GpxWindow1,
        'gpx-window-2': GpxWindow2,
        'gpx-window-3': GpxWindow3,
        'gpx-window-4': GpxWindow4,
        'gpx-window-5': GpxWindow5,
        'gpx-button-navbar': GpxButtonNavbar,
        'gpx-page-button': GpxPageButton,
        'gpx-hvline': GpxHvline
    },
    methods: {
        ...mapActions([
            'actionKeytextInit',
            'actionLanguageChange',
            'actionFontStyleInit'
        ]),
        windowInit() {
            // Single client
            this.$bus.$emit('appLoadingFinished', {
                isLoading: false
            })
            this.$bus.$on('windowHide', () => {
                for (let key in this.showWindow) {
                    this.showWindow[key] = false
                }
            })
            this.$bus.$on('windowShow', event => {
                this.showWindow[event.windowName] = true
            })
            this.$bus.$on('windowLoad', () => {
                this.isLoading = false
            })
            // Broadcast
            io_window.on('windowHide', () => {
                for (let key in this.showWindow) {
                    this.showWindow[key] = false
                }
            })
            io_window.on('windowShow', data => {
                this.showWindow[data.windowName] = true
            })
        },
        winpc32Init: async function() {
            let URL = gURL + '/winpc32/init'
            // AJAX
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.text()
                console.log(result)
                this.$bus.$emit('winpc32Init', {
                    isLoading: false
                })
            } else {
                let text = await res.text()
                console.warn(text)
            }
        },
        getGpxInit: async function() {
            let URL = gURL + '/api/gpx'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.actionKeytextInit(result['style-sheet']['key-text'])
                this.actionLanguageChange(
                    result['style-sheet']['language-table'][0]
                )
                this.actionFontStyleInit(result['style-sheet']['ss:font'])
                this.drawPageFrame(result['gpx:document'])
                let win = result.PageFrame.find(
                    item => item['page-title'] == 'Window1'
                )
                this.drawWindow(win)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        drawPageFrame(_pf) {
            // define the color of main
            let main = document.getElementsByClassName('gpx')[0]
            main.style.backgroundColor = '#' + _pf['color-void']

            // define the dimentions of PageFrame
            let pf = document.getElementsByClassName('page-frame')[0]
            pf.style.width = _pf.rect[2].toString() + 'px'
            pf.style.height = _pf.rect[3].toString() + 'px'
            pf.style.backgroundColor = '#' + _pf['color-paper']
        },
        drawWindow(_win) {
            // computed the size of ButtonNavbar and window
            let winWidth = _win.rect[2] - _win.rect[0]
            let winHeight = _win.rect[3] - _win.rect[1]

            // define the window
            let win = document.getElementsByClassName('window')[0]
            win.style.width = winWidth.toString() + 'px'
            win.style.height = winHeight.toString() + 'px'

            // show first page
            this.isLoading = true
            this.$bus.$emit('showFirstPage')
        },
        websocketInit() {
            socket.on('first server emit', function(data) {
                console.log(data)
                socket.emit('first event', 'Someone connected')
            })
        }
    },
    created() {
        this.websocketInit()
        this.winpc32Init()
        this.getGpxInit()
        this.windowInit()
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
</style>