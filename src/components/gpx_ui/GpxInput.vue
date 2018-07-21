<template>
    <div>
        <input class="gpx-input" type="text" :style="styleObject" :value="showValue" @focus="showModal">
        <gpx-modal v-if="isModalShown" @ok="changeValue">
            <h3 slot="header">{{parentHeader}}</h3>
            <button class="button-discrete" v-if="isDiscrete" slot='body' @click="setOn">{{promptSet}}</button>
            <button class="button-discrete" v-if="isDiscrete" slot='body' @click="setOff">{{promptReset}}</button>
            <input class="parent-input" v-if="!isDiscrete" slot="body" ref="input" type="text" v-model="modalInputValue" @keyup="detectKeycode">
            <gpx-keyboard v-if="!isDiscrete" slot="body" :keyboardType="keyboardType" @keying="onKeying"></gpx-keyboard>
            <span slot="footer">{{parentFooter}}</span>
            <p style="color:red" v-if="showWarning" slot="warning">{{parentWarning}}</p>
            <span v-if="isDiscrete" slot="default-button"></span>
        </gpx-modal>
    </div>
</template>

<script>
import gURL from '@/router/url'
import GpxModal from '@/components/gpx_ui/GpxModal'
import GpxKeyboard from '@/components/gpx_ui/GpxKeyboard'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            // style
            styleObject: {},
            // modal
            isModalShown: false,
            parentHeader: 'Parent header',
            parentFooter: 'Parent footer',
            parentWarning: 'Please check the value!',
            showWarning: false,
            modalInputValue: '',
            // discrete
            isDiscrete: false,
            promptSet: 'ON',
            promptReset: 'OFF',
            discreteValue: 'OFF',
            // analog
            analogValue: 0,
            beAutofocus: true,
            // string
            stringValue: ' '
        }
    },
    computed: {
        ...mapGetters({
            keytext: 'getKeytext',
            language: 'getLanguage'
        }),
        controlLink() {
            return this.componentProperties['control-link'][0]
        },
        controlLinkName() {
            return this.componentProperties['control-link'][0]['link-name']
        },
        keyboardType() {
            return {
                typeNumber:
                    this.controlLinkName == 'userinput-analog' ? true : false,
                typeString:
                    this.controlLinkName == 'userinput-string' ? true : false
            }
        },
        showValue() {
            if (this.controlLinkName == 'userinput-discrete') {
                return this.discreteValue
            } else if (this.controlLinkName == 'userinput-analog') {
                return this.analogValue
            } else if (this.controlLinkName == 'userinput-string') {
                return this.stringValue
            }
        },
        uTagname() {
            return parseInt(this.controlLink.tagname.match(/\d+/)[0])
        }
    },
    components: {
        'gpx-modal': GpxModal,
        'gpx-keyboard': GpxKeyboard
    },
    methods: {
        componentInit() {
            let rect = this.componentProperties.rect
            this.styleObject = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                color: '#' + this.componentProperties['text-color']
            }
            this.assignModalData()
        },
        showModal() {
            this.isModalShown = true
            if (this.isModalShown && !this.isDiscrete) {
                let self = this
                this.$nextTick().then(function() {
                    self.$refs.input.focus()
                })
            }
        },
        assignModalData() {
            if (this.controlLinkName == 'userinput-discrete') {
                this.isDiscrete = true
                this.promptSet = this.msg(this.controlLink['prompt-set'])
                this.promptReset = this.msg(this.controlLink['prompt-reset'])
                this.parentFooter = this.msg(this.controlLink['to-user'])
                this.parentHeader = 'Discrete'
            } else if (this.controlLinkName == 'userinput-analog') {
                this.parentFooter = this.msg(this.controlLink['to-user'])
                this.parentHeader = 'Analog'
            } else if (this.controlLinkName == 'userinput-string') {
                this.parentFooter = this.msg(this.controlLink['to-user'])
                this.parentHeader = 'String'
            }
        },
        msg(id) {
            return this.keytext.find(item => item.id == id)[this.language]
        },
        setOn() {
            this.discreteValue = this.msg(this.controlLink['msg-on'])
            this.isModalShown = false
            this.update_A_Bit()
        },
        setOff() {
            this.discreteValue = this.msg(this.controlLink['msg-off'])
            this.isModalShown = false
            this.update_A_Bit()
        },
        detectKeycode(event) {
            if (event.keyCode == 13) this.changeValue()
        },
        changeValue() {
            if (this.controlLinkName == 'userinput-analog') {
                let format = this.controlLink['text-format']
                let temp = format.match(/\.[^a-zA-Z]+/g)
                if (temp == null) {
                    let i_num = parseInt(this.modalInputValue)
                    if (isNaN(i_num)) {
                        this.showWarning = true
                    } else {
                        this.analogValue = i_num
                        this.showWarning = false
                        this.isModalShown = false
                    }
                } else {
                    format = temp[0]
                    let digits = format.match(/\d+/)[0]
                    let p = digits.split('').length
                    let f_num = parseFloat(this.modalInputValue)
                    if (isNaN(f_num)) {
                        this.showWarning = true
                    } else {
                        this.analogValue = parseFloat(f_num.toFixed(p))
                        this.showWarning = false
                        this.isModalShown = false
                    }
                }
            } else if (this.controlLinkName == 'userinput-string') {
                this.stringValue = this.modalInputValue
                this.isModalShown = false
            }
            this.update_R_Bit()
        },
        onKeying(unit) {
            if (unit == '⬅') {
                let tempString = this.modalInputValue.split('')
                tempString.pop()
                this.modalInputValue = tempString.join('')
            } else {
                this.modalInputValue += unit
            }
        },
        update_R_Bit: async function() {
            // API
            let URL = gURL + '/winpc32/update_R_Bit'

            // 實例表頭
            let m_headers = new Headers()
            // This one is enough for GET requests
            m_headers.append('Accept', 'application/json')
            // This one sends body
            m_headers.append('Content-Type', 'application/json')

            // 資料酬載 (Payload)
            let tempValue = ''
            if (typeof this.showValue == 'string') {
                for (let index in this.showValue) {
                    tempValue += this.showValue.charCodeAt(index).toString()
                }
                tempValue = parseInt(tempValue)
            } else {
                tempValue = this.showValue
            }
            let data = {
                value: tempValue,
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
                state: this.discreteValue == 'ON' ? true : false,
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
        this.componentInit()
        this.update_A_Bit()
        if (this.controlLinkName != 'userinput-discrete') this.update_R_Bit()
    }
}
</script>

<style scoped>
.gpx-input {
    cursor: pointer;
    text-align: center;
    position: absolute;
    background-color: #000;
    width: 50px;
    font-size: 15px;
}
.button-discrete {
    width: 100px;
    height: 50px;
    margin: 5px;
}
.parent-input {
    font-size: 20px;
    height: 30px;
}
</style>
