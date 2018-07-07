<template>
    <div>
        <input class="gpx-input" type="text" :style="styleObject" :value="showValue" @focus="showModal">
        <gpx-modal v-if="isModalShown" @ok="changeValue">
            <h3 slot="header">{{parentHeader}}</h3>
            <button class="button-discrete" v-if="isDiscrete" slot='body' @click="setOn">{{promptSet}}</button>
            <button class="button-discrete" v-if="isDiscrete" slot='body' @click="setOff">{{promptReset}}</button>
            <input class="parent-input" v-if="!isDiscrete" slot="body" ref="input" type="text" v-model="modalInputValue" @keyup="detectKeycode">
            <span slot="footer">{{parentFooter}}</span>
            <p style="color:red" v-if="showWarning" slot="warning">{{parentWarning}}</p>
            <span v-if="isDiscrete" slot="default-button"></span>
        </gpx-modal>
    </div>
</template>

<script>
import GpxModal from '@/components/gpx_ui/GpxModal'
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
            analogValue: '0',
            beAutofocus: true,
            // string
            stringValue: 'string'
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
        showValue() {
            if (this.controlLinkName == 'userinput-discrete') {
                return this.discreteValue
            } else if (this.controlLinkName == 'userinput-analog') {
                return this.analogValue
            } else if (this.controlLinkName == 'userinput-string') {
                return this.stringValue
            }
        }
    },
    components: {
        'gpx-modal': GpxModal
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
        },
        setOff() {
            this.discreteValue = this.msg(this.controlLink['msg-off'])
            this.isModalShown = false
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
                        this.analogValue = f_num.toFixed(p)
                        this.showWarning = false
                        this.isModalShown = false
                    }
                }
            } else if (this.controlLinkName == 'userinput-string') {
                this.stringValue = this.modalInputValue
                this.isModalShown = false
            }
        }
    },
    created() {
        this.componentInit()
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
