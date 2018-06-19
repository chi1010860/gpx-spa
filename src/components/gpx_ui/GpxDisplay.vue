<template>
    <div class="gpx-display" :style="{backgroundColor: bgColor}"></div>
</template>

<script>
export default {
    name: 'GpxDisplay',
    props: {
        controlLink: {
            state: false,
            msg: '',
            type: '',
            discrete: '',
            tagname: ''
        }
    },
    data() {
        return {
            eventName: 'eventBy_' + this.controlLink.tagname
        }
    },
    computed: {
        bgColor() {
            return this.controlLink.state ? 'green' : 'red'
        }
    },
    methods: {},
    created() {
        this.$bus.$on(this.eventName, event => {
            console.log(event.state)
            this.controlLink.state = event.state
        })
    },
    beforeDestroy() {
        this.$bus.$off(this.eventName)
    },
    updated() {}
}
</script>

<style scoped>
.gpx-display {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    height: 48px;
    background-color: #c0c0c0;
}
</style>
