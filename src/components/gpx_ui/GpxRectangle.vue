<template>
    <div class="gpx-rectangle" :style="rectangleStyle" v-show="isTurnOn"></div>
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
            rectangleStyle: {},
            isTurnOn: true,
            firstState: true,
            blinkTimer: ''
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
                this.isTurnOn = this.controlLink.state ? false : true
                bgColor = '#00c688'
            } else if (cn == 'blink') {
                this.firstState = this.controlLink.visibility ? false : true
                this.isTurnOn = this.controlLink.visibility ? false : true
                bgColor = '#00c688'
            } else if (cn == 'fillcolor-discrete') {
                bgColor = '#' + this.componentProperties['brush-color']
            } else if (cn == 'fillcolor-analog') {
                bgColor = '#' + this.componentProperties['brush-color']
            } else if (cn == 'fillalarm-discrete') {
                bgColor = '#' + this.componentProperties['brush-color']
            } else if (cn == 'fillalarm-analog') {
                bgColor = '#' + this.componentProperties['brush-color']
            } else if (cn == 'linecolor-discrete') {
                bgColor = '#' + this.componentProperties['brush-color']
                bdStyle = '2px solid ' + 'red'
            } else if (cn == 'linecolor-analog') {
                bgColor = '#' + this.componentProperties['brush-color']
                bdStyle = '2px solid ' + 'red'
            } else if (cn == 'linealarm-discrete') {
                bgColor = '#' + this.componentProperties['brush-color']
                bdStyle = '2px solid ' + 'red'
            } else if (cn == 'linealarm-analog') {
                bgColor = '#' + this.componentProperties['brush-color']
                bdStyle = '2px solid ' + 'red'
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
                    this.isTurnOn = !this.isTurnOn
                }, this.blinkPeriod)
            } else {
                clearInterval(this.blinkTimer)
            }
        }
    },
    created() {
        this.componentInit()
        this.$bus.$on(this.eventName, event => {
            if (this.controlLinkName == 'visibility') {
                if (event.state != null) {
                    if (this.firstState == false) {
                        this.isTurnOn = event.state
                    } else if (this.firstState == true) {
                        this.isTurnOn = !event.state
                    }
                }
            } else if (this.controlLinkName == 'blink') {
                if (event.state != null) {
                    this.toggleBlink(event.state)
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
