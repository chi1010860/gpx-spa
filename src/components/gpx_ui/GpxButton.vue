<template>
    <button @mousedown="fnMousedown" @mouseup="fnMouseup" :style="styleObject">{{ msg }}</button>
</template>

<script>
import gURL from '@/router/url'
import { mapGetters, mapActions } from 'vuex'

var enumDiscreteType = new Map([
    ['direct', null],
    ['reverse', 1],
    ['toggle', 2],
    ['reset', 3],
    ['set', 4]
])

var enumAnalog

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
            analogValue: 0
        }
    },
    computed: {
        ...mapGetters({
            keytext: 'getKeytext',
            language: 'getLanguage'
        }),
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
                height: rect[3] - rect[1] + 'px'
            }
        },
        linkName() {
            return this.controlLink['link-name']
        },
        uTagname() {
            return parseInt(this.controlLink.tagname.match(/\d+/)[0])
        }
    },
    methods: {
        fnMousedown(e) {
            if (this.linkName == 'PB-discrete') {
                this.PB_discrete(this.controlLink, e.type)
            } else if (this.linkName == 'PB-action') {
                this.PB_action(this.controlLink, e.type)
            }
        },
        fnMouseup(e) {
            if (this.linkName == 'PB-discrete') {
                this.PB_discrete(this.controlLink, e.type)
            } else if (this.linkName == 'PB-action') {
                this.PB_action(this.controlLink, e.type)
            }
        },
        componentInit() {
            this.controlLink = this.componentProperties['control-link'][0]
            this.eventName = 'eventBy_' + this.controlLink.tagname
            if (this.linkName == 'PB-discrete') {
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
        },
        PB_discrete(controlLink, eventType) {
            if (eventType == 'mousedown') {
                if (
                    controlLink.keypad == enumDiscreteType.get('direct') ||
                    controlLink.keypad == enumDiscreteType.get('reverse')
                ) {
                    // console.log(`keypad: ${controlLink.keypad} ${eventType}`)
                    this.isTurnOn = !this.isTurnOn
                    this.$bus.$emit(this.eventName, {
                        state: this.isTurnOn
                    })
                    this.update_A_Bit()
                }
            } else if (eventType == 'mouseup') {
                if (
                    controlLink.keypad == enumDiscreteType.get('direct') ||
                    controlLink.keypad == enumDiscreteType.get('reverse') ||
                    controlLink.keypad == enumDiscreteType.get('toggle')
                ) {
                    // console.log(`keypad: ${controlLink.keypad} ${eventType}`)
                    this.isTurnOn = !this.isTurnOn
                    this.$bus.$emit(this.eventName, {
                        state: this.isTurnOn
                    })
                    this.update_A_Bit()
                } else if (controlLink.keypad == enumDiscreteType.get('set')) {
                    // console.log(`keypad: ${controlLink.keypad}`)
                    this.isTurnOn = true
                    this.$bus.$emit(this.eventName, {
                        state: this.isTurnOn
                    })
                    this.update_A_Bit()
                } else if (
                    controlLink.keypad == enumDiscreteType.get('reset')
                ) {
                    // console.log(`keypad: ${controlLink.keypad}`)
                    this.isTurnOn = false
                    this.$bus.$emit(this.eventName, {
                        state: this.isTurnOn
                    })
                    this.update_A_Bit()
                }
            }
        },
        PB_action(controlLink, eventType) {
            let vm = this
            vincentScriptParser(controlLink['vincent-script'])
            if (eventType == 'mousedown') {
                if (controlLink['on-down'] != null) {
                    this.$bus.$emit(this.eventName, {
                        analogValue: this.analogValue,
                        linkName: this.linkName,
                        vsEval: this.vsEval
                    })
                } else if (controlLink['while-down'] != null) {
                    vm.timer = setInterval(function() {
                        vm.$bus.$emit(vm.eventName, {
                            analogValue: vm.analogValue,
                            linkName: vm.linkName,
                            vsEval: vm.vsEval
                        })
                    }, 50)
                }
            } else if (eventType == 'mouseup') {
                if (controlLink['while-down'] != null) {
                    clearInterval(this.timer)
                } else if (controlLink['on-up']) {
                    this.$bus.$emit(this.eventName, {
                        analogValue: this.analogValue,
                        linkName: this.linkName,
                        vsEval: this.vsEval
                    })
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
                state: this.isTurnOn,
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
    },
    beforeMount() {
        this.update_A_Bit()
    },
    mounted() {
        this.componentInit()
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
    border: 2px outset #ddd;
}
button:active {
    top: 1px;
    border: 2px solid #ddd;
}
</style>
