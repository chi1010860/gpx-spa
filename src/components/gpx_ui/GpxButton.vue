<template>
    <button @mousedown="fnMousedown" :style="styleObject" :disabled="isDisable">{{ msg }}</button>
</template>

<script>
import gURL from '@/router/url'
import { mapGetters, mapActions } from 'vuex'
import { update_A_Bit } from '@/assets/js/winpc32ajax'
import io from 'socket.io-client'

var io_button = io.connect(gURL + '/button')

var enumDiscreteType = new Map([
    ['direct', null],
    ['reverse', 1],
    ['toggle', 2],
    ['reset', 3],
    ['set', 4]
])

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            controlLink: {},
            isTurnOn: false,
            timer: null,
            // event emit
            isMousedown: false,
            eventName: '',
            vsEval: [],
            analogValue: 0,
            // disable
            isDisable: false,
            disableEvent: ''
        }
    },
    computed: {
        ...mapGetters({
            keytext: 'getKeytext',
            language: 'getLanguage',
            fontStyle: 'getFontStyle'
        }),
        fontSzie() {
            let index =
                this.componentProperties.font != null
                    ? parseInt(this.componentProperties.font)
                    : 1
            return Math.abs(this.fontStyle[index - 1].height) + 'px'
        },
        msg() {
            if (this.componentProperties.message != undefined) {
                return this.keytext.find(
                    item => item.id == this.componentProperties.message
                )[this.language]
            } else {
                return ''
            }
        },
        styleObject() {
            let rect = this.componentProperties.rect
            return {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                'font-size': this.fontSzie
            }
        },
        controlLinkName() {
            return this.controlLink['link-name']
        },
        uTagname() {
            return parseInt(this.controlLink.tagname.match(/\d+/)[0])
        }
    },
    methods: {
        componentInit() {
            this.controlLink = this.componentProperties['control-link'][0]
            this.eventName = 'eventBy_' + this.controlLink.tagname
            if (this.controlLinkName == 'PB-discrete') {
                if (
                    this.controlLink.keypad == enumDiscreteType.get('reverse')
                ) {
                    this.isTurnOn = true
                    this.$bus.$emit(this.eventName, {
                        state: this.isTurnOn
                    })
                } else {
                    this.isTurnOn = false
                    this.$bus.$emit(this.eventName, {
                        state: this.isTurnOn
                    })
                }
            }
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
        fnMousedown(e) {
            var vm = this
            if (this.controlLinkName == 'PB-discrete') {
                this.PB_discrete(this.controlLink, e.type)
            } else if (this.controlLinkName == 'PB-action') {
                this.PB_action(this.controlLink, e.type)
            }
            document.onmouseup = fnMouseup

            function fnMouseup(e) {
                if (vm.controlLinkName == 'PB-discrete') {
                    vm.PB_discrete(vm.controlLink, e.type)
                } else if (vm.controlLinkName == 'PB-action') {
                    vm.PB_action(vm.controlLink, e.type)
                }
                // clear events
                document.onmouseup = null
                document.onmousemove = null
            }
        },
        PB_discrete(controlLink, eventType) {
            if (eventType == 'mousedown') {
                if (
                    controlLink.keypad == enumDiscreteType.get('direct') ||
                    controlLink.keypad == enumDiscreteType.get('reverse')
                ) {
                    // console.log(`keypad: ${controlLink.keypad} ${eventType}`)
                    this.isTurnOn = !this.isTurnOn
                    updateData.call(this)
                }
            } else if (eventType == 'mouseup') {
                if (
                    controlLink.keypad == enumDiscreteType.get('direct') ||
                    controlLink.keypad == enumDiscreteType.get('reverse') ||
                    controlLink.keypad == enumDiscreteType.get('toggle')
                ) {
                    // console.log(`keypad: ${controlLink.keypad} ${eventType}`)
                    this.isTurnOn = !this.isTurnOn
                    updateData.call(this)
                } else if (controlLink.keypad == enumDiscreteType.get('set')) {
                    // console.log(`keypad: ${controlLink.keypad}`)
                    this.isTurnOn = true
                    updateData.call(this)
                } else if (
                    controlLink.keypad == enumDiscreteType.get('reset')
                ) {
                    // console.log(`keypad: ${controlLink.keypad}`)
                    this.isTurnOn = false
                    updateData.call(this)
                }
            }
            function updateData() {
                this.$bus.$emit(this.eventName, {
                    state: this.isTurnOn
                })
                io_button.emit('buttonCall', {
                    uTagname: this.uTagname,
                    isTurnOn: this.isTurnOn,
                    state: this.isTurnOn
                })
                update_A_Bit(this.uTagname, this.isTurnOn)
            }
        },
        PB_action(controlLink, eventType) {
            let vm = this
            vincentScriptParser(controlLink['vincent-script'])
            if (eventType == 'mousedown') {
                if (controlLink['on-down'] != null) {
                    updateValue()
                } else if (controlLink['while-down'] != null) {
                    vm.timer = setInterval(updateValue, 50)
                }
            } else if (eventType == 'mouseup') {
                if (controlLink['while-down'] != null) {
                    clearInterval(this.timer)
                } else if (controlLink['on-up']) {
                    updateValue()
                }
            }
            function vincentScriptParser(vincentScripts) {
                let tempValue = {}
                for (let i in vincentScripts) {
                    let varAddress = vincentScripts[i]
                        .match(/.+=/g)[0]
                        .match(/\w+/)[0]
                    let varAssiments = vincentScripts[i]
                        .match(/=.+/)[0]
                        .match(/\w+/g)
                    let varOperators = vincentScripts[i]
                        .match(/=.+/)[0]
                        .match(/[*/;+-]/g)

                    vm.eventName = 'eventBy_' + varAddress
                    if (varAssiments[0] == varAddress) {
                        varAssiments.shift()
                        if (varOperators[varOperators.length - 1] == ';')
                            varOperators.pop()
                        for (let j in varAssiments) {
                            vm.vsEval[j] =
                                '(function() { vm.analogValue = vm.analogValue ' +
                                varOperators[j] +
                                varAssiments[j] +
                                ' })'
                        }
                    }
                }
            }
            function updateValue() {
                vm.$bus.$emit(vm.eventName, {
                    analogValue: vm.analogValue,
                    controlLinkName: vm.controlLinkName,
                    vsEval: vm.vsEval
                })
                io_button.emit('PB-action call', {
                    eventName: vm.eventName,
                    analogValue: vm.analogValue,
                    controlLinkName: vm.controlLinkName,
                    vsEval: vm.vsEval
                })
            }
        }
    },
    created() {
        this.componentInit()
        update_A_Bit(this.uTagname, this.isTurnOn)
    },
    beforeDestroy() {
        this.$bus.$off(this.disableEvent)
    }
}
</script>

<style scoped>
button {
    cursor: pointer;
    position: absolute;
    width: 100px;
    height: 50px;
    padding: 1px;
    border: 3px outset #ddd;
}
button:active {
    top: 1px;
    border: 2px solid #ddd;
}
</style>
