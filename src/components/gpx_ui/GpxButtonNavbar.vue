<template>
    <div class="button-navbar" :style="navbarStyle">
        <gpx-page-button v-for="(item, index) in pageButton" :componentProperties="item" :key="'pageButton' + index"></gpx-page-button>
    </div>
</template>

<script>
import gURL from '@/router/url.js'
import GpxPageButton from '@/components/gpx_ui/GpxPageButton'
import { mapGetters, mapActions } from 'vuex'
import { update_A_Bit } from '@/assets/js/winpc32ajax'

export default {
    data() {
        return {
            pageButton: [],
            uTagname: 0,
            navbarStatus: false,
            navbarStyle: {}
        }
    },
    components: {
        'gpx-page-button': GpxPageButton
    },
    methods: {
        getGpxButtonNavbar: async function() {
            let URL = gURL + '/api/gpx'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                let pf = result.PageFrame.find(
                    item => item['page-title'] == 'Button'
                )
                this.drawButtonNavbar(pf)
                this.pageButton = pf['gpx:object']._Button
                for (let p in this.pageButton) {
                    this.pageButton[p].message =
                        pf['gpx:object'].MSG[p].MessageIndex[0].message
                    this.pageButton[p].window = 'Window' + (parseInt(p) + 1)
                    this.pageButton[p].tagname = 2 + Number(p)
                }
                // update_A_bit
                this.uTagname = parseInt(pf.tagname.match(/\d+/)[0])
                this.navbarStatus = true
                update_A_Bit(this.uTagname, this.navbarStatus)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        drawButtonNavbar(_pf) {
            let bnWidth = _pf.rect[2] - _pf.rect[0]
            let bnHeight = _pf.rect[3] - _pf.rect[1]
            this.navbarStyle = {
                width: bnWidth + 'px',
                height: bnHeight + 'px',
                backgroundColor: '#' + _pf['brush-color']
            }
        }
    },
    created() {
        this.getGpxButtonNavbar()
    },
    beforeDestroy() {
        this.navbarStatus = false
        update_A_Bit(this.uTagname, this.navbarStatus)
    }
}
</script>

<style scoped>
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
