<template>
    <div class="gpx-text" :style="styleObject">{{msg}}</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            controlLonk: {}
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
        styleObject() {
            let rect = this.componentProperties.rect
            let color = ''
            if (this.componentProperties['text-color'] != null) {
                let buffer = this.componentProperties['text-color'].split('')
                buffer.push(buffer.shift())
                buffer.push(buffer.shift())
                for (let c in buffer) {
                    color += buffer[c]
                }
            }
            let backgroundColor = this.componentProperties['brush-color']
            return {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                color: '#' + color,
                'background-color': '#' + backgroundColor
            }
        }
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
