<template>
    <router-link :to="{name: routerlinkName}" exact>
        <button class="page-button" :style="styleObject" v-html="msg" @mousedown="fnActive" @mouseup="fnInactive"></button>
    </router-link>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            styleObject: {}
        }
    },
    computed: {
        ...mapGetters({
            keytext: 'getKeytext',
            language: 'getLanguage'
        }),
        routerlinkName() {
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
            this.styleObject = {
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                backgroundColor: '#' + this.componentProperties['brush-color'],
                border: '2px outset #ddd'
            }
        },
        fnActive() {
            this.styleObject.border = '2px solid #ddd'
        },
        fnInactive() {
            this.styleObject.border = '2px outset #ddd'
        }
    },
    created() {
        this.componentInit()
    }
}
</script>

<style scoped>
.page-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    color: #000080;
    margin-right: 1px;
    text-decoration: none;
    text-align: center;
    border: 2px outset #ddd;
}
.page-button:active {
    color: #333;
}
</style>
