<template>
    <div class="gpx-line" :style="lineStyle"></div>
</template>

<script>
export default {
    props: {
        componentProperties: {}
    },
    computed: {
        lineStyle() {
            let rect = this.componentProperties.rect
            let bgColor = this.componentProperties['pen-color'] || 888
            return {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px',
                'background-color': '#' + bgColor
            }
        }
    }
}
</script>

<style scoped>
.gpx-line {
    position: absolute;
    background-color: #888888;
}
</style>
