<template>
    <div class="gpx-title">
        <h1 class="font-h1-primary">{{ titleName.h1 }}</h1>
        <h1 class="font-h1-secondary">{{ titleName.h1 }}</h1>
        <h2 class="font-h2-primary">{{ titleName.h2 }}</h2>
        <h2 class="font-h2-secondary">{{ titleName.h2 }}</h2>
    </div>
</template>

<script>
import gURL from '@/router/url'
import { mapGetters, mapActions } from 'vuex'
import { update_A_Bit } from '@/assets/js/winpc32ajax'

export default {
    data() {
        return {
            titleName: {
                h1: '',
                h2: ''
            },
            uTagname: 0,
            windowStatus: false,
            msgBuffer: []
        }
    },
    computed: {
        ...mapGetters({
            keytext: 'getKeytext',
            language: 'getLanguage',
            fontStyle: 'getFontStyle'
        })
    },
    watch: {
        language() {
            this.getMessage(this.msgBuffer)
        }
    },
    methods: {
        getGpxTitle: async function() {
            let URL = gURL + '/api/gpx'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                let pf = result.PageFrame.find(
                    item => item['page-title'] == 'Title'
                )
                this.msgBuffer = pf['gpx:object'].MSG
                this.getMessage(this.msgBuffer)
                this.uTagname = parseInt(pf.tagname.match(/\d+/)[0])
                this.windowStatus = true
                update_A_Bit(this.uTagname, this.windowStatus)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        getMessage(data) {
            let MSG1 = data.find(item => item.text == '2A')
            let h1_index = MSG1.MessageIndex[0].message
            this.titleName.h1 = this.keytext.find(item => item.id == h1_index)[
                this.language
            ]

            let MSG2 = data.find(item => item.text == '30')
            let h2_index = MSG2.MessageIndex[0].message
            this.titleName.h2 = this.keytext.find(item => item.id == h2_index)[
                this.language
            ]
        }
    },
    created() {
        this.getGpxTitle()
    },
    beforeDestroy() {
        this.windowStatus = false
        update_A_Bit(this.uTagname, this.windowStatus)
    }
}
</script>

<style scoped>
.gpx-title {
    width: 800px;
    height: 80px;
    font-size: 32px;
    padding: 20px;
    background-color: #c0c0c0;
}
.font-h1-primary {
    position: absolute;
    left: 265px;
    top: 4px;
    width: 224px;
    height: 34px;
    color: #000080;
    z-index: 2;
    font-size: 29px;
    margin: 0;
}
.font-h1-secondary {
    position: absolute;
    left: 266px;
    top: 5px;
    width: 224px;
    height: 34px;
    color: #ffffff;
    z-index: 1;
    font-size: 29px;
    margin: 0;
}
.font-h2-primary {
    position: absolute;
    left: 265px;
    top: 38px;
    width: 224px;
    height: 34px;
    color: #000080;
    z-index: 2;
    font-size: 24px;
    margin: 0;
}
.font-h2-secondary {
    position: absolute;
    left: 266px;
    top: 39px;
    width: 224px;
    height: 34px;
    color: #ffffff;
    z-index: 1;
    font-size: 24px;
    margin: 0;
}
</style>
