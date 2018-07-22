<template>
    <input class="gpx-value" type="text" :value="showValue" :style="styleObject" disabled>
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
            analogValue: 0,
            stringValue: '',
            eventName: '',
            uTagname: 0
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
        showValue() {
            if (this.controlLink['link-name'] == 'value-discrete') {
                return this.discreteValue
            } else if (this.controlLink['link-name'] == 'value-analog') {
                return this.analogValue
            } else if (this.controlLink['link-name'] == 'value-string') {
                return this.stringValue
            }
        },
        discreteValue() {
            return this.isTurnOn ? 'ON' : 'OFF'
        },
        styleObject() {
            let rect = this.componentProperties.rect
            let Transparent = this.componentProperties.Transparent
            return {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                border: Transparent == '1' ? 'none' : '',
                'background-color': Transparent == '1' ? 'buttonface' : '',
                cursor: Transparent == '1' ? 'pointer' : ''
            }
        }
    },
    methods: {
        componentInit() {
            this.controlLink = this.componentProperties['control-link'][0]
            this.uTagname = parseInt(
                this.controlLink.expression.match(/\d+/)[0]
            )
            this.eventName =
                'eventBy_' + this.controlLink.expression.match(/\w+/)[0]
        },
        update_R_Bit: async function(_tagname, _value) {
            // API
            let URL = gURL + '/winpc32/update_R_Bit'

            // Headers
            let m_headers = new Headers()
            m_headers.append('Accept', 'application/json')
            m_headers.append('Content-Type', 'application/json')

            // Payload
            let data = {
                tagname: _tagname,
                value: _value
            }
            let encodedData = JSON.stringify(data)

            // Request
            let reqInit = {
                method: 'POST',
                headers: m_headers,
                body: encodedData
            }

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
        this.componentInit()
        this.$bus.$on(this.eventName, event => {
            if (event.state != null) {
                this.isTurnOn = event.state
            }

            if (event.analogValue != null) {
                if (event.controlLinkName == 'PB-action') {
                    let vm = this
                    for (let i in event.vsEval) {
                        var fn = eval(event.vsEval[0])
                        fn()
                        vm.update_R_Bit(vm.uTagname, vm.analogValue)
                    }
                } else {
                    this.analogValue = event.analogValue
                }
            }

            if (event.stringValue != null) {
                this.stringValue = event.stringValue
            }
        })
    },
    beforeDestroy() {
        this.$bus.$off(this.eventName)
    }
}
</script>

<style scoped>
input {
    position: absolute;
    margin: 0px;
    text-align: center;
    color: black;
    user-select: all;
}
</style>
