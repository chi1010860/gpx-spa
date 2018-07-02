<template>
    <p class="gpx-clock">{{datetime}}</p>
</template>

<script>
export default {
    data() {
        return {
            datetime: '',
            timer: ''
        }
    },
    methods: {
        updateDatetime() {
            this.datetime = new Date().toLocaleString()
        },
        cancelAutoUpdate() {
            clearInterval(this.timer)
        }
    },
    created() {
        this.timer = setInterval(this.updateDatetime, 1000)
    },
    beforeDestroy() {
        this.cancelAutoUpdate()
    }
}
</script>

<style scoped>
.gpx-clock {
    position: absolute;
    left: 610px;
    top: 0px;
    width: 193px;
    height: 16px;
    color: #000000;
    z-index: 1;
    margin: 0;
}
</style>
