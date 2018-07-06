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

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            controlLink: {},
            isTurnOn: false,
            eventName: ''
        }
    },
    computed: {
        ...mapGetters({
            keytext: 'getKeytext',
            language: 'getLanguage'
        }),
        msg() {
            return this.keytext.find(
                item => item.id == this.componentProperties.message
            )[this.language]
        },
        uTagname() {
            return parseInt(this.controlLink.tagname.match(/\d+/)[0])
        },
        styleObject() {
            let rect = this.componentProperties.rect
            return {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px'
            }
        }
    },
    methods: {
        fnMousedown(e) {
            this.PB_discrete(this.controlLink, e.type)
        },
        fnMouseup(e) {
            this.PB_discrete(this.controlLink, e.type)
        },
        componentInit() {
            this.controlLink = this.componentProperties['control-link'][0]
            this.eventName = 'eventBy_' + this.controlLink.tagname
            if (this.controlLink['link-name'] == 'PB-discrete') {
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
                if (controlLink['link-name'] == 'PB-discrete') {
                    if (
                        controlLink.keypad == enumDiscreteType.get('direct') ||
                        controlLink.keypad == enumDiscreteType.get('reverse')
                    ) {
                        console.log(
                            `keypad: ${controlLink.keypad} ${eventType}`
                        )
                        this.isTurnOn = !this.isTurnOn
                        this.$bus.$emit(this.eventName, {
                            state: this.isTurnOn
                        })
                        this.changeBit_A()
                    }
                }
            } else if (eventType == 'mouseup') {
                if (controlLink['link-name'] == 'PB-discrete') {
                    if (
                        controlLink.keypad == enumDiscreteType.get('direct') ||
                        controlLink.keypad == enumDiscreteType.get('reverse') ||
                        controlLink.keypad == enumDiscreteType.get('toggle')
                    ) {
                        console.log(
                            `keypad: ${controlLink.keypad} ${eventType}`
                        )
                        this.isTurnOn = !this.isTurnOn
                        this.$bus.$emit(this.eventName, {
                            state: this.isTurnOn
                        })
                        this.changeBit_A()
                    } else if (
                        controlLink.keypad == enumDiscreteType.get('set')
                    ) {
                        console.log(`keypad: ${controlLink.keypad}`)
                        this.isTurnOn = true
                        this.$bus.$emit(this.eventName, {
                            state: this.isTurnOn
                        })
                        this.changeBit_A()
                    } else if (
                        controlLink.keypad == enumDiscreteType.get('reset')
                    ) {
                        console.log(`keypad: ${controlLink.keypad}`)
                        this.isTurnOn = false
                        this.$bus.$emit(this.eventName, {
                            state: this.isTurnOn
                        })
                        this.changeBit_A()
                    }
                }
            }
        },
        PB_action(controlLink, eventType) {
            if (eventType == 'mousedown') {
                console.log(eventType)
            } else if (eventType == 'mousedown') {
                console.log(eventType)
            }
        },
        changeBit_A: async function() {
            // API
            let URL = gURL + '/winpc32/changeBit_A'

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
                console.log(`tagname: ${this.uTagname} value: ${result.bValue}`)
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
        this.changeBit_A()
    },
    mounted() {
        this.componentInit()
    }
}
</script>

<style scoped>
button {
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
