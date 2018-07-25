<template>
    <div>
        <input class="gpx-input" type="text" :style="styleObject" :value="showValue" @focus="showModal" :disabled="isDisable">
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
import { update_A_Bit, update_R_Bit } from '@/assets/js/winpc32ajax'

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
            minValue: 0,
            maxValue: 100,
            // string
            stringValue: ' ',
            eventName: '',
            // disable
            isDisable: false,
            disableEvent: ''
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
    watch: {
        language() {
            this.assignModalData(this.msgBuffer)
        }
    },
    components: {
        'gpx-modal': GpxModal,
        'gpx-keyboard': GpxKeyboard
    },
    methods: {
        componentInit() {
            this.eventName =
                'eventBy_' + this.controlLink.tagname.match(/\w+/)[0]
            let rect = this.componentProperties.rect
            this.styleObject = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                color: '#' + this.componentProperties['text-color']
            }
            this.assignModalData()
            let cl = this.componentProperties['control-link'].find(
                item => item['link-name'] == 'disable'
            )
            if (cl != null) {
                this.disableEvent = 'eventBy_' + cl.expression.match(/\w+/)[0]
                this.$bus.$on(this.disableEvent, event => {
                    if (event.state != null) {
                        this.isDisable = event.state
                    }
                })
            }
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
            update_A_Bit(
                this.uTagname,
                this.discreteValue == 'ON' ? true : false
            )
        },
        setOff() {
            this.discreteValue = this.msg(this.controlLink['msg-off'])
            this.isModalShown = false
            update_A_Bit(
                this.uTagname,
                this.discreteValue == 'ON' ? true : false
            )
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
                    } else if (i_num < this.minValue || i_num > this.maxValue) {
                        this.showWarning = true
                    } else {
                        this.analogValue = i_num
                        this.showWarning = false
                        this.isModalShown = false
                    }
                    if (this.modalInputValue == '') {
                        this.analogValue = 0
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
                    } else if (f_num < this.minValue || f_num > this.maxValue) {
                        this.showWarning = true
                    } else {
                        this.analogValue = parseFloat(f_num.toFixed(p))
                        this.showWarning = false
                        this.isModalShown = false
                    }
                    if (this.modalInputValue == '') {
                        this.analogValue = 0
                        this.showWarning = false
                        this.isModalShown = false
                    }
                }
                this.$bus.$emit(this.eventName, {
                    analogValue: this.analogValue,
                    controlLinkName: this.controlLinkName
                })
            } else if (this.controlLinkName == 'userinput-string') {
                this.stringValue = this.modalInputValue
                this.isModalShown = false

                this.$bus.$emit(this.eventName, {
                    stringValue: this.stringValue,
                    controlLinkName: this.controlLinkName
                })
            }

            let tempValue = ''
            if (typeof this.showValue == 'string') {
                for (let index in this.showValue) {
                    tempValue += this.showValue.charCodeAt(index).toString()
                }
                tempValue = parseInt(tempValue)
            } else {
                tempValue = this.showValue
            }
            update_R_Bit(this.uTagname, tempValue)
        },
        onKeying(unit) {
            if (unit == '⬅') {
                let tempString = this.modalInputValue.split('')
                tempString.pop()
                this.modalInputValue = tempString.join('')
            } else {
                this.modalInputValue += unit
            }
        }
    },
    created() {
        this.componentInit()
        update_A_Bit(this.uTagname, this.discreteValue == 'ON' ? true : false)
        if (this.controlLinkName != 'userinput-discrete') {
            let tempValue = ''
            if (typeof this.showValue == 'string') {
                for (let index in this.showValue) {
                    tempValue += this.showValue.charCodeAt(index).toString()
                }
                tempValue = parseInt(tempValue)
            } else {
                tempValue = this.showValue
            }
            update_R_Bit(this.uTagname, tempValue)
        }
    },
    beforeDestroy() {
        this.$bus.$off(this.disableEvent)
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
