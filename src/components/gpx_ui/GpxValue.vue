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
        componentProperties: {},
        pNumberValue: 0
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
        analogValue() {
            return this.pNumberValue
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
            this.isTurnOn = event.state
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
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
</style>
