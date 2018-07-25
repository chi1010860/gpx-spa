<template>
    <button @mousedown="fnActive" :style="[buttonStyle, updateStyle]" v-html="msg"></button>
</template>

<script>
import gURL from '@/router/url'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            buttonStyle: {},
            updateStyle: {}
        }
    },
    computed: {
        ...mapGetters({
            keytext: 'getKeytext',
            language: 'getLanguage'
        }),
        windowName() {
            return this.componentProperties.window
        },
        msg() {
            return this.keytext.find(
                item => item.id == this.componentProperties.message
            )[this.language]
        }
    },
    methods: {
        componentInit() {
            let rect = this.componentProperties.rect
            this.buttonStyle = {
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                backgroundColor: '#' + this.componentProperties['brush-color'],
                border: '2px outset #ddd'
            }
        },
        fnActive(e) {
            var vm = this
            vm.updateStyle = { border: '2px solid #ddd' }
            document.onmouseup = fnInactive

            function fnInactive(e) {
                vm.$bus.$emit('windowHide')
                vm.$bus.$emit('windowShow', {
                    windowName: vm.windowName.toLowerCase()
                })
                vm.updateStyle = { border: '2px outset #ddd' }

                // clear events
                document.onmouseup = null
                document.onmousemove = null
            }
        }
    },
    created() {
        this.componentInit()
    }
}
</script>

<style scoped>
button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    color: #000080;
    margin-right: 1px;
    text-decoration: none;
    text-align: center;
    border: 3px outset #ddd;
}
</style>
