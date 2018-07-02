<template>
    <input class="gpx-text" type="text" :value="textValue" disabled>
</template>

<script>
export default {
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
        textValue() {
            return this.controlLink.state ? 'ON' : 'OFF'
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
    }
}
</script>

<style scoped>
.gpx-text {
    width: 100px;
    height: 50px;
    margin: 3px 0px 3px 0px;
    text-align: center;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
</style>
