<template>
    <input class="gpx-value" type="text" :value="showValue" :style="styleObject" disabled>
</template>

<script>
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
        showValue() {
            if (this.controlLink['link-name'] == 'value-discrete') {
                return this.discreteValue
            } else if (this.controlLink['link-name'] == 'value-analog') {
                return this.analogValue
            }
        },
        discreteValue() {
            return this.isTurnOn ? 'ON' : 'OFF'
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
        componentInit() {
            this.controlLink = this.componentProperties['control-link'][0]
            this.eventName =
                'eventBy_' + this.controlLink.expression.match(/\w+/)[0]
        }
    },
    created() {
        this.componentInit()
        this.$bus.$on(this.eventName, event => {
            if (event.state != null) {
                this.isTurnOn = event.state
            }

            if (event.analogValue != null) {
                if (event.linkName != null) {
                    let vm = this
                    for (let i in event.vsEval) {
                        var fn = eval(event.vsEval[0])
                        fn()
                    }
                } else {
                    this.analogValue = event.analogValue
                }
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
}
</style>
