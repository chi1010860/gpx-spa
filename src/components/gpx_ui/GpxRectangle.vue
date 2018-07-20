<template>
    <div class="gpx-rectangle" :style="rectangleStyle"></div>
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
            rectangleStyle: {}
        }
    },
    methods: {
        componentInit() {
            let rect = this.componentProperties.rect
            this.rectangleStyle = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px'
            }
        }
    },
    created() {
        this.componentInit()
    }
}
</script>

<style scoped>
.gpx-rectangle {
    position: absolute;
    background-color: #c0c0c0;
    border: 1px solid grey;
}
</style>
