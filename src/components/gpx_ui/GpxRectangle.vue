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
            let cl = this.componentProperties['control-link']
            if (cl.length == 1) {
                return cl[0]
            } else if (cl.length > 1) {
                return [cl[0], cl[1]]
            } else {
                return ''
            }
        },
        controlLinkName() {
            if (Array.isArray(this.controlLink) == false) {
                return this.controlLink['link-name']
            } else if (Array.isArray(this.controlLink) == true) {
                return [
                    this.controlLink[0]['link-name'],
                    this.controlLink[1]['link-name']
                ]
            }
        },
        eventName() {
            if (Array.isArray(this.controlLink) == false) {
                let temp1 =
                    this.controlLink.expression != null
                        ? this.controlLink.expression.match(/\w+/)[0]
                        : null
                let temp2 =
                    this.controlLink.tagname != null
                        ? this.controlLink.tagname.match(/\w+/)[0]
                        : null
                return 'eventBy_' + (temp1 || temp2)
            } else {
                let tempArray = [
                    this.controlLink[0].expression.match(/\w+/)[0],
                    this.controlLink[1].expression.match(/\w+/)[0]
                ]
                return tempArray.map(x => 'eventBy_' + x)
            }
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
            let bgColor = ''
            let bdStyle = ''

            if (Array.isArray(this.controlLinkName) == false) {
                colorInit.call(this, this.controlLinkName)
            } else {
                for (let i in this.controlLinkName) {
                    colorInit.call(this, this.controlLinkName[i])
                }
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

            function colorInit(cn) {
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
                    bgColor = colorRevise(
                        this.componentProperties['brush-color']
                    )
                    bdStyle = '2px solid ' + this.color_off
                } else if (cn == 'linecolor-analog') {
                    bgColor = colorRevise(
                        this.componentProperties['brush-color']
                    )
                    bdStyle = '2px solid ' + this.color_analog[0]
                } else if (cn == 'linealarm-discrete') {
                    bgColor = colorRevise(
                        this.componentProperties['brush-color']
                    )
                    bdStyle = '2px solid ' + this.color_off
                } else if (cn == 'linealarm-analog') {
                    bgColor = colorRevise(
                        this.componentProperties['brush-color']
                    )
                    bdStyle = '2px solid ' + this.color_analog[0]
                }
                if (cn == 'objectsize-width') {
                    bgColor = colorRevise(
                        this.componentProperties['brush-color']
                    )
                    this.objectsizeChange()
                } else if (cn == 'objectsize-height') {
                    bgColor = colorRevise(
                        this.componentProperties['brush-color']
                    )
                    this.objectsizeChange()
                } else if (cn == 'location-horizontal') {
                    bgColor = colorRevise(
                        this.componentProperties['brush-color']
                    )
                    this.locationChange()
                } else if (cn == 'location-vertical') {
                    bgColor = colorRevise(
                        this.componentProperties['brush-color']
                    )
                    this.locationChange()
                } else if (cn == 'percentfill-width') {
                    bgColor = '#808080'
                } else if (cn == 'percentfill-height') {
                    bgColor = '#808080'
                } else if (cn == 'percentfill-radial') {
                    bgColor = '#808080'
                }
            }

            function colorRevise(_color) {
                let resultColor = ''
                if (_color != null) {
                    let buffer = _color.split('')
                    buffer.push(buffer.shift())
                    buffer.push(buffer.shift())
                    for (let c in buffer) {
                        resultColor += buffer[c]
                    }
                }
                resultColor = '#' + resultColor
                return resultColor
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
        },
        objectsizeChange() {
            let rect = this.componentProperties.rect
            let w = rect[2] - rect[0]
            let h = rect[3] - rect[1]
            let t = rect[1]
            let cn = this.controlLinkName
            let cn_isArray = false
            if (Array.isArray(cn) == false) {
                updateStyleChange.call(this, cn)
            } else if (Array.isArray(cn) == true) {
                cn_isArray = true
                for (let i in cn) {
                    updateStyleChange.call(this, cn[i])
                }
            }
            this.updateStyle = {
                width: w + 'px',
                top: t + 'px',
                height: h + 'px'
            }

            function updateStyleChange(cn) {
                if (cn.match(/width/) != null) {
                    w = Math.ceil(
                        this.value / this.maxValue * (rect[2] - rect[0])
                    )
                }
                if (cn.match(/height/) != null) {
                    h = Math.ceil(
                        this.value / this.maxValue * (rect[3] - rect[1])
                    )
                    if (cn_isArray == false) {
                        t = rect[1] + (rect[3] - rect[1]) - h
                    }
                }
            }
        },
        locationChange() {
            let rect = this.componentProperties.rect
            let l = rect[0]
            let t = rect[1]
            let cn = this.controlLinkName
            let cn_isArray = false
            if (Array.isArray(cn) == false) {
                updateStyleChange.call(this, cn)
            } else if (Array.isArray(cn) == true) {
                cn_isArray = true
                for (let i in cn) {
                    updateStyleChange.call(this, cn[i])
                }
            }
            this.updateStyle = {
                left: l + 'px',
                top: t + 'px'
            }

            function updateStyleChange(cn) {
                if (cn.match(/horizontal/) != null) {
                    if (cn_isArray == false) {
                        l = rect[0] + this.value
                    } else {
                        l = rect[0] + this.value / this.maxValue * 70
                    }
                }
                if (cn.match(/vertical/) != null) {
                    if (cn_isArray == false) {
                        t = rect[1] + this.maxValue - this.value
                    } else {
                        t = rect[1] + this.value / this.maxValue * 70
                    }
                }
            }
        },
        percentfillChange() {
            let rect = this.componentProperties.rect
            let l = rect[0]
            let t = rect[1]
            let w = rect[2] - rect[0]
            let h = rect[3] - rect[1]
            let cn = this.controlLinkName
            let cn_isArray = false

            if (Array.isArray(cn) == false) {
                removeDiv(this.eventName)
                updateStyleChange.call(this, cn)
                createDiv(this.eventName)
            } else if (Array.isArray(cn) == true) {
                cn_isArray = true
                removeDiv(this.eventName[0])
                for (let i in cn) {
                    updateStyleChange.call(this, cn[i])
                }
                createDiv(this.eventName[0])
            }

            function createDiv(en) {
                let updateStyle = {
                    left: l + 'px;',
                    top: t + 'px;',
                    width: w + 'px;',
                    height: h + 'px;'
                }
                var div = document.createElement('div')
                div.style =
                    'left:' +
                    updateStyle.left +
                    'top:' +
                    updateStyle.top +
                    'width:' +
                    updateStyle.width +
                    'height:' +
                    updateStyle.height +
                    'background-color: #0080FF;' +
                    'position:absolute;'
                div.id = en
                document.getElementsByClassName('container')[0].appendChild(div)
            }

            function removeDiv(en) {
                let c = document.getElementsByClassName('container')[0]
                let lastDiv = document.getElementById(en)
                if (lastDiv != null) c.removeChild(lastDiv)
            }

            function updateStyleChange(cn) {
                if (cn.match(/width/) != null) {
                    w = Math.ceil(
                        this.value / this.maxValue * (rect[2] - rect[0])
                    )
                }
                if (cn.match(/height/) != null) {
                    h = Math.ceil(
                        this.value / this.maxValue * (rect[3] - rect[1])
                    )
                    if (cn_isArray == false) {
                        t = rect[1] + (rect[3] - rect[1]) - h
                    }
                }
                if (cn.match(/radial/) != null) {
                    l =
                        rect[0] +
                        (rect[2] - rect[0]) / 2 -
                        Math.ceil(
                            this.value / this.maxValue * (rect[2] - rect[0]) / 2
                        )
                    t =
                        rect[1] +
                        (rect[3] - rect[1]) / 2 -
                        Math.ceil(
                            this.value / this.maxValue * (rect[3] - rect[1]) / 2
                        )
                    w = Math.ceil(
                        this.value / this.maxValue * (rect[2] - rect[0])
                    )
                    h = Math.ceil(
                        this.value / this.maxValue * (rect[3] - rect[1])
                    )
                }
            }
        }
    },
    created() {
        this.componentInit()

        this.$bus.$on(this.eventName, event => {
            if (Array.isArray(this.controlLinkName) == false) {
                eventHandler.call(this, this.controlLinkName, event)
            } else {
                for (let i in this.controlLinkName) {
                    eventHandler.call(this, this.controlLinkName[i], event)
                }
            }
        })

        function eventHandler(cn, event) {
            if (cn == 'visibility') {
                if (event.state != null) {
                    if (this.firstState == false) {
                        this.isShown = event.state
                    } else if (this.firstState == true) {
                        this.isShown = !event.state
                    }
                }
            } else if (cn == 'blink') {
                if (event.state != null) {
                    this.toggleBlink(event.state)
                }
            } else if (cn.match(/discrete/) != null) {
                if (event.state != null) {
                    this.isTurnOn = event.state
                    this.toggleColor()
                }
            } else if (cn.match(/analog/) != null) {
                if (event.analogValue != null) {
                    this.value = event.analogValue
                    this.levelColor()
                }
            } else if (cn.match(/objectsize/) != null) {
                this.value = parseInt(event.analogValue)
                this.objectsizeChange()
            } else if (cn.match(/location/) != null) {
                this.value = parseInt(event.analogValue)
                this.locationChange()
            } else if (cn.match(/percentfill/) != null) {
                this.value = parseInt(event.analogValue)
                this.percentfillChange()
            }
        }
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
