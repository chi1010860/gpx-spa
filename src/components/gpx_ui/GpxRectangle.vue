<template>
    <div class="gpx-rectangle" :style="[rectangleStyle, updateStyle]" v-show="isShown"></div>
</template>

<script>
// Warning
// Don't use this component
export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            // General
            rectangleStyle: {},
            updateStyle: {},
            // Blink
            isShown: true,
            firstState: true,
            blinkTimer: '',
            // Analog
            value: 0,
            maxValue: 100,
            color_analog: [
                '#00CC33',
                '#00FF66',
                '#FFEB3B',
                '#FF8C00',
                '#FF0000'
            ],
            // Discrete
            isTurnOn: false,
            color_on: '#00CC33',
            color_off: '#FF0000'
        }
    },
    computed: {
        controlLink() {
            return this.componentProperties['control-link'][0]
        },
        controlLinkName() {
            return this.controlLink['link-name']
        },
        eventName() {
            let temp1 =
                this.controlLink.expression != null
                    ? this.controlLink.expression.match(/\w+/)[0]
                    : null
            let temp2 =
                this.controlLink.tagname != null
                    ? this.controlLink.tagname.match(/\w+/)[0]
                    : null
            return 'eventBy_' + (temp1 || temp2)
        },
        uTagname() {
            let temp1 =
                this.controlLink.expression != null
                    ? this.controlLink.expression.match(/\d+/)[0]
                    : null
            let temp2 =
                this.controlLink.tagname != null
                    ? this.controlLink.tagname.match(/\d+/)[0]
                    : null
            return temp1 || temp2
        },
        blinkPeriod() {
            return 500
        }
    },
    methods: {
        componentInit() {
            let cn = this.controlLinkName
            let bgColor = ''
            let bdStyle = ''
            if (cn == 'visibility') {
                this.firstState = this.controlLink.state ? false : true
                this.isShown = this.controlLink.state ? false : true
                bgColor = this.color_on
            } else if (cn == 'blink') {
                this.firstState = this.controlLink.visibility ? false : true
                this.isShown = this.controlLink.visibility ? false : true
                bgColor = this.color_on
            } else if (cn == 'fillcolor-discrete') {
                bgColor = this.color_off
            } else if (cn == 'fillcolor-analog') {
                bgColor = this.color_analog[0]
            } else if (cn == 'fillalarm-discrete') {
                bgColor = this.color_off
            } else if (cn == 'fillalarm-analog') {
                bgColor = this.color_analog[0]
            } else if (cn == 'linecolor-discrete') {
                bgColor = '#' + this.componentProperties['brush-color']
                bdStyle = '2px solid ' + this.color_off
            } else if (cn == 'linecolor-analog') {
                bgColor = '#' + this.componentProperties['brush-color']
                bdStyle = '2px solid ' + this.color_analog[0]
            } else if (cn == 'linealarm-discrete') {
                bgColor = '#' + this.componentProperties['brush-color']
                bdStyle = '2px solid ' + this.color_off
            } else if (cn == 'linealarm-analog') {
                bgColor = '#' + this.componentProperties['brush-color']
                bdStyle = '2px solid ' + this.color_analog[0]
            }

            let rect = this.componentProperties.rect
            this.rectangleStyle = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                'background-color': bgColor,
                border: bdStyle
            }
        },
        toggleBlink(state) {
            if (state == true) {
                this.blinkTimer = setInterval(() => {
                    this.isShown = !this.isShown
                }, this.blinkPeriod)
            } else {
                clearInterval(this.blinkTimer)
            }
        },
        toggleColor() {
            let bgColor = ''
            let bdStyle = ''
            if (this.controlLinkName.match(/fill/) != null) {
                if (this.isTurnOn == true) {
                    bgColor = this.color_on
                } else {
                    bgColor = this.color_off
                }
            } else if (this.controlLinkName.match(/line/) != null) {
                if (this.isTurnOn == true) {
                    bdStyle = '2px solid ' + this.color_on
                } else {
                    bdStyle = '2px solid ' + this.color_off
                }
            }

            this.updateStyle = {
                'background-color': bgColor,
                border: bdStyle
            }
        },
        levelColor() {
            let bgColor = ''
            let bdStyle = ''
            if (this.controlLinkName.match(/fill/) != null) {
                if (this.value >= 0 * this.maxValue) {
                    bgColor = this.color_analog[0]
                }
                if (this.value > 0.2 * this.maxValue) {
                    bgColor = this.color_analog[1]
                }
                if (this.value > 0.4 * this.maxValue) {
                    bgColor = this.color_analog[2]
                }
                if (this.value > 0.6 * this.maxValue) {
                    bgColor = this.color_analog[3]
                }
                if (this.value > 0.8 * this.maxValue) {
                    bgColor = this.color_analog[4]
                }
            } else if (this.controlLinkName.match(/line/) != null) {
                if (this.value >= 0 * this.maxValue) {
                    bdStyle = '2px solid ' + this.color_analog[0]
                }
                if (this.value > 0.2 * this.maxValue) {
                    bdStyle = '2px solid ' + this.color_analog[1]
                }
                if (this.value > 0.4 * this.maxValue) {
                    bdStyle = '2px solid ' + this.color_analog[2]
                }
                if (this.value > 0.6 * this.maxValue) {
                    bdStyle = '2px solid ' + this.color_analog[3]
                }
                if (this.value > 0.8 * this.maxValue) {
                    bdStyle = '2px solid ' + this.color_analog[4]
                }
            }

            this.updateStyle = {
                'background-color': bgColor,
                border: bdStyle
            }
        }
    },
    created() {
        this.componentInit()
        this.$bus.$on(this.eventName, event => {
            if (this.controlLinkName == 'visibility') {
                if (event.state != null) {
                    if (this.firstState == false) {
                        this.isShown = event.state
                    } else if (this.firstState == true) {
                        this.isShown = !event.state
                    }
                }
            } else if (this.controlLinkName == 'blink') {
                if (event.state != null) {
                    this.toggleBlink(event.state)
                }
            } else if (this.controlLinkName.match(/discrete/) != null) {
                if (event.state != null) {
                    this.isTurnOn = event.state
                    this.toggleColor()
                }
            } else if (this.controlLinkName.match(/analog/) != null) {
                if (event.analogValue != null) {
                    this.value = event.analogValue
                    this.levelColor()
                }
            }
        })
    },
    beforeDestroy() {
        this.$bus.$off(this.eventName)
        clearInterval(this.blinkTimer)
    }
}
</script>

<style scoped>
.gpx-rectangle {
    position: absolute;
    background-color: #c0c0c0;
}
</style>
