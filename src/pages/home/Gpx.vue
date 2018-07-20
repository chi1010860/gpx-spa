<template>
    <div class="gpx">
        <div class="page-frame">
            <div class="window">
                <router-view></router-view>
            </div>
            <div class="button-navbar">
                <gpx-page-button v-for="(item, index) in pageButton" :componentProperties="item" :key="'pageButton' + index"></gpx-page-button>
            </div>
            <gpx-hvline :rect="hvline"></gpx-hvline>
        </div>
    </div>
</template>

<script>
import gURL from '@/router/url.js'
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
            language: 'getLanguage'
        })
    },
    components: {
        'gpx-page-button': GpxPageButton,
        'gpx-hvline': GpxHvline
    },
    methods: {
        ...mapActions(['actionKeytextInit', 'actionLanguageChange']),
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
                this.drawWindow(result['gpx:document'])
                let pf = result.PageFrame.find(
                    item => item['page-title'] == 'Button'
                )
                this.drawButtonNavbar(pf)
                this.pageButton = pf['gpx:object']._Button
                for (let p in this.pageButton) {
                    this.pageButton[p].message =
                        pf['gpx:object'].MSG[p].MessageIndex[0].message
                    this.pageButton[p].window = 'Window' + (parseInt(p) + 1)
                }
            } else {
                let text = await res.text()
                console.log(text)
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
            let winWidth = data.rect[2]
            let winHeight = data.rect[1]
            let bnWidth = data.rect[2] - data.rect[0]
            let bnHeight = data.rect[3] - data.rect[1]

            // define the window
            let win = document.getElementsByClassName('window')[0]
            win.style.width = winWidth.toString() + 'px'
            win.style.height = winHeight.toString() + 'px'

            // define the ButtonNavbar
            let bn = document.getElementsByClassName('button-navbar')[0]
            bn.style.width = bnWidth.toString() + 'px'
            bn.style.height = bnHeight.toString() + 'px'
            bn.style.backgroundColor = '#' + data['brush-color']
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
.button-navbar {
    display: flex;
    text-align: left;
    padding-left: 10px;
    padding-top: 10px;
}
a {
    text-decoration: none;
}
</style>