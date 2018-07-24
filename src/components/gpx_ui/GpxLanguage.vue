<template>
    <button @click="fnClick" :style="styleObject">{{ msg }}</button>
</template>

<script>
import gURL from '@/router/url'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            componentProperties: {},
            languageTable: [],
            isTurnOn: false,
            styleObject: {},
            fontSzie: '',
            msg: '',
            msgBuffer: [],
            // event emit
            isMousedown: false,
            eventName: '',
            uTagname: 0
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
        language: function(value) {
            this.getMessage(this.msgBuffer)
        }
    },
    methods: {
        ...mapActions(['actionLanguageChange']),
        getGpxTitle: async function() {
            let URL = gURL + '/api/gpx'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                let pf = result.PageFrame.find(
                    item => item['page-title'] == 'Title'
                )
                this.languageTable = result['style-sheet']['language-table']
                this.componentProperties = pf['gpx:object'].BUTTON[0]
                this.uTagname = parseInt(
                    this.componentProperties.tagname0.match(/\d+/)[0]
                )
                this.msgBuffer = pf['gpx:object'].MSG
                this.getMessage(this.msgBuffer)
                this.componentInit()
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        componentInit() {
            this.eventName =
                'eventBy_' + this.componentProperties.tagname0.match(/\w+/)[0]
            this.$bus.$emit(this.eventName, {
                state: this.isTurnOn
            })
            let rect = this.componentProperties.rect
            this.fontSzie = Math.abs(this.fontStyle[1].height) + 'px'
            this.styleObject = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                'font-size': this.fontSzie
            }

            this.update_A_Bit(this.uTagname, this.isTurnOn)
        },
        getMessage(data) {
            let MSG1 = data.find(item => item.text == '27')
            let tempMsg = MSG1.MessageIndex[0].message
            this.msg = this.keytext.find(item => item.id == tempMsg)[
                this.language
            ]
        },
        fnClick() {
            this.isTurnOn = !this.isTurnOn
            if (this.isTurnOn == true) {
                this.actionLanguageChange(this.languageTable[1])
                this.update_A_Bit(this.uTagname, this.isTurnOn)
            } else if (this.isTurnOn == false) {
                this.actionLanguageChange(this.languageTable[0])
                this.update_A_Bit(this.uTagname, this.isTurnOn)
            }
        },
        update_A_Bit: async function(_tagname, _state) {
            // API
            let URL = gURL + '/winpc32/update_A_Bit'

            // Headers
            let m_headers = new Headers()
            m_headers.append('Accept', 'application/json')
            m_headers.append('Content-Type', 'application/json')

            // Payload
            let data = {
                tagname: _tagname,
                state: _state
            }
            let encodedData = JSON.stringify(data)
            let reqInit = {
                method: 'POST',
                headers: m_headers,
                body: encodedData
            }

            // Request
            let m_request = new Request(URL, reqInit)

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
    }
}
</script>

<style scoped>
button {
    cursor: pointer;
    position: absolute;
    width: 100px;
    height: 50px;
    padding: 0px 1px 1px 1px;
    border: 3px outset #ddd;
    border-top: 0px;
}
button:active {
    top: 1px;
    border: 2px solid #ddd;
}
</style>
