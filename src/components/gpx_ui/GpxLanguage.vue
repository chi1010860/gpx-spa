<template>
    <button @click="fnClick" :style="styleObject" v-show="isShown">{{ msg }}</button>
</template>

<script>
import gURL from '@/router/url'
import { mapGetters, mapActions } from 'vuex'
import { update_A_Bit } from '@/assets/js/winpc32ajax'
import io from 'socket.io-client'

var socket = io.connect(gURL + '/language')

export default {
    data() {
        return {
            componentProperties: {},
            languageTable: [],
            isShown: false,
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
        },
        isTurnOn() {
            this.changeLanguage()
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

            update_A_Bit(this.uTagname, this.isTurnOn)
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
            update_A_Bit(this.uTagname, this.isTurnOn)
            this.socketEmit()
        },
        changeLanguage() {
            if (this.isTurnOn == true) {
                this.actionLanguageChange(this.languageTable[1])
            } else if (this.isTurnOn == false) {
                this.actionLanguageChange(this.languageTable[0])
            }
        },
        socketEmit() {
            let data = {
                isTurnOn: this.isTurnOn
            }
            socket.emit('language toggle', data)
        },
        socketListen() {
            socket.on('language toggle', data => {
                console.log(data)
                this.isTurnOn = data.isTurnOn
            })
        }
    },
    created() {
        this.$bus.$on('showFirstPage', () => {
            this.isShown = true
        })
        this.getGpxTitle()
        this.socketListen()
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
