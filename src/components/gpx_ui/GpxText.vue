<template>
    <div class="gpx-text" :style="textStyle">{{msg}}</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            textStyle: {}
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
            let temp =
                this.controlLink != null
                    ? this.controlLink.expression.match(/\w+/)[0]
                    : null
            return temp
        }
    },
    methods: {
        componentInit() {
            let rect = this.componentProperties.rect
            let color = ''
            let backgroundColor = ''
            if (this.controlLinkName == 'normal') {
                if (this.componentProperties['text-color'] != null) {
                    let buffer = this.componentProperties['text-color'].split(
                        ''
                    )
                    buffer.push(buffer.shift())
                    buffer.push(buffer.shift())
                    for (let c in buffer) {
                        color += buffer[c]
                    }
                }
                backgroundColor = this.componentProperties['brush-color']
            }

            this.textStyle = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                color: '#' + color,
                'background-color': '#' + backgroundColor
            }
        }
    },
    created() {
        this.componentInit()
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
}
</style>
