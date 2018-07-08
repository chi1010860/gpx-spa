<template>
    <div class="slider-wrapper" :style="styleObject">
        <input :class="classObject" type="range" min="0" max="100" v-model="sliderValue">
    </div>
</template>

<script>
export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            // wrapper
            styleObject: {},
            // slider
            sliderValue: 0,
            eventName: ''
        }
    },
    computed: {
        isRotated() {
            return this.componentProperties.rotate != null ? true : false
        },
        // slider
        classObject() {
            return this.isRotated ? 'slider-vertical' : 'slider-horizontal'
        }
    },
    methods: {
        componentInit() {
            this.controlLink = this.componentProperties['control-link'][0]
            this.eventName = 'eventBy_' + this.controlLink.tagname
            let rect = this.componentProperties.rect
            this.styleObject = {
                left: rect[0] + 'px',
                top: rect[1] + 10 + 'px',
            }
        }
    },
    created() {
        this.componentInit()
    },
    updated() {
        this.$bus.$emit(this.eventName, {
            analogValue: this.sliderValue
        })
    }
}
</script>

<style scoped>
.slider-wrapper {
    position: absolute;
    display: inline-block;
    width: 100px;
    height: 100px;
    padding: 0;
}
.slider-horizontal {
    width: 100px;
    height: 20px;
    margin: 0;
}
.slider-vertical {
    width: 100px;
    height: 20px;
    margin: 0;
    transform-origin: 50px 50px;
    transform: rotate(-90deg);
}
</style>
