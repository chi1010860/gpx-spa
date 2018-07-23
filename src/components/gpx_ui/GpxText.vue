<template>
    <div class="gpx-text" :style="[textStyle, updateStyle]" v-show="isShown">{{msg}}</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            // General
            textStyle: {},
            updateStyle: {},
            isShown: true,
            textType: '',
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
            color_off: '#000000'
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
            if (this.componentProperties.message != null) {
                return this.keytext.find(
                    item => item.id == this.componentProperties.message
                )[this.language]
            } else {
                return ''
            }
        },
        controlLink() {
            let temp =
                this.componentProperties['control-link'] != null
                    ? this.componentProperties['control-link'][0]
                    : null
            return temp
        },
        controlLinkName() {
            let temp =
                this.controlLink != null
                    ? this.controlLink['link-name']
                    : 'normal'
            return temp
        },
        eventName() {
            if (this.controlLink != null) {
                if (this.controlLink.expression != null) {
                    return (
                        'eventBy_' + this.controlLink.expression.match(/\w+/)[0]
                    )
                } else if (this.controlLink.tagname != null) {
                    return 'eventBy_' + this.controlLink.tagname.match(/\w+/)[0]
                }
            } else {
                return ''
            }
        },
        level() {
            if (this.controlLink != null) {
                if (this.controlLink.expression != null) {
                    var temp = this.controlLink.expression.match(/\w+/g)
                    return temp != null ? temp[1] : ''
                }
            } else {
                return ''
            }
        },
        levelExpression() {
            if (this.controlLink != null) {
                if (this.controlLink.expression != null) {
                    var temp = this.controlLink.expression
                        .replace(/\w+/, '')
                        .match(/[^;]+/)
                    return temp != null ? temp[0] : ''
                }
            } else {
                return ''
            }
        },
        levelDetect() {
            let tempFn =
                '(function() { ' +
                'if (vm.level<=10){vm.color_on = vm.color_analog[0]}' +
                'else if (vm.level>10 && vm.level<=20){vm.color_on = vm.color_analog[2]}' +
                'else if (vm.level>=80 && vm.level<90){vm.color_on = vm.color_analog[3]}' +
                'else if (vm.level>=90){vm.color_on = vm.color_analog[4]}' +
                'if (vm.value' +
                this.levelExpression +
                '){ vm.isTurnOn = true } else {' +
                'vm.isTurnOn = false }})'
            return tempFn
        }
    },
    methods: {
        componentInit() {
            let fontColor = ''
            let bgColor = ''
            if (this.controlLinkName == 'normal') {
                if (this.componentProperties['text-color'] != null) {
                    let buffer = this.componentProperties['text-color'].split(
                        ''
                    )
                    buffer.push(buffer.shift())
                    buffer.push(buffer.shift())
                    for (let c in buffer) {
                        fontColor += buffer[c]
                    }
                }
                fontColor = '#' + fontColor
                bgColor = '#' + this.componentProperties['brush-color']
            } else if (this.controlLinkName.match(/discrete/) != null) {
                fontColor = this.color_off
            } else if (this.controlLinkName.match(/analog/) != null) {
                fontColor = this.color_analog[0]
            }

            let rect = this.componentProperties.rect
            this.textStyle = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                color: fontColor,
                'background-color': bgColor,
                'font-size': this.fontSzie
            }
        },
        toggleColor() {
            let fontColor = ''
            if (this.controlLinkName.match(/discrete/) != null) {
                if (this.isTurnOn == true) {
                    fontColor = this.color_on
                } else {
                    fontColor = this.color_off
                }
            }

            this.updateStyle = {
                color: fontColor
            }
        },
        levelColor() {
            let fontColor = ''
            if (this.controlLinkName.match(/analog/) != null) {
                if (this.value >= 0 * this.maxValue) {
                    fontColor = this.color_analog[0]
                }
                if (this.value > 0.2 * this.maxValue) {
                    fontColor = this.color_analog[1]
                }
                if (this.value > 0.4 * this.maxValue) {
                    fontColor = this.color_analog[2]
                }
                if (this.value > 0.6 * this.maxValue) {
                    fontColor = this.color_analog[3]
                }
                if (this.value > 0.8 * this.maxValue) {
                    fontColor = this.color_analog[4]
                }
            }

            this.updateStyle = {
                color: fontColor
            }
        },
        toggleColorByAnalog() {
            let vm = this
            let levelDetect = eval(this.levelDetect)
            levelDetect()
            this.toggleColor()
        }
    },
    created() {
        this.componentInit()
        if (this.controlLinkName.match(/discrete/) != null) {
            this.toggleColorByAnalog()
        }
        this.$bus.$on(this.eventName, event => {
            if (this.controlLinkName.match(/discrete/) != null) {
                if (event.state != null) {
                    this.isTurnOn = event.state
                    this.toggleColor()
                } else if (event.analogValue != null) {
                    this.value = event.analogValue
                    this.toggleColorByAnalog()
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
    }
}
</script>

<style scoped>
.gpx-text {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
    background-color: transparent;
    color: black;
    white-space: nowrap;
}
</style>
