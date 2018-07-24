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
                this.update_A_Bit()
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
        },
        update_A_Bit: async function() {
            // API
            let URL = gURL + '/winpc32/update_A_Bit'

            // 實例表頭
            let m_headers = new Headers()
            // This one is enough for GET requests
            m_headers.append('Accept', 'application/json')
            // This one sends body
            m_headers.append('Content-Type', 'application/json')
            // 資料酬載 (Payload)
            let data = {
                state: this.windowStatus,
                tagname: this.uTagname
            }
            let encodedData = JSON.stringify(data)
            let m_Init = {
                method: 'POST',
                headers: m_headers,
                body: encodedData
            }

            // 實例請求
            let m_request = new Request(URL, m_Init)

            // AJAX
            let res = await fetch(m_request)

            if (res.ok) {
                let result = await res.json()
                console.log(
                    `tagname: ${result.logicName} value: ${result.bitValue}`
                )
            } else {
                let text = await res.text()
                console.warn(text)
            }
        }
    },
    created() {
        this.getGpxTitle()
    },
    beforeDestroy() {
        this.windowStatus = false
        this.update_A_Bit()
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
