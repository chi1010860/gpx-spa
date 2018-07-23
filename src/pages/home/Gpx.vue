<template>
    <div class="gpx">
        <div class="page-frame">
            <gpx-title></gpx-title>
            <gpx-clock></gpx-clock>
            <gpx-language></gpx-language>
            <div class="window">
                <router-view></router-view>
            </div>
            <gpx-button-navbar></gpx-button-navbar>
            <gpx-hvline :rect="hvline"></gpx-hvline>
        </div>
    </div>
</template>

<script>
import gURL from '@/router/url.js'
import GpxTitle from '@/components/gpx_ui/GpxTitle'
import GpxClock from '@/components/gpx_ui/GpxClock'
import GpxLanguage from '@/components/gpx_ui/GpxLanguage'
import GpxButtonNavbar from '@/components/gpx_ui/GpxButtonNavbar'
import GpxPageButton from '@/components/gpx_ui/GpxPageButton'
import GpxHvline from '@/components/gpx_ui/GpxHVLine'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            pageButton: [],
            hvline: [[0, 492, 800, 494], [-1, 495, 800, 497]]
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
        'gpx-title': GpxTitle,
        'gpx-clock': GpxClock,
        'gpx-language': GpxLanguage,
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
        }
    },
    created() {
        this.winpc32Init()
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
</style>