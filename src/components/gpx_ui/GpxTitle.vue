<template>
    <div class="gpx-title">{{ titleName }}</div>
</template>

<script>
import gURL from '@/router/url'

export default {
    name: 'GpxName',
    props: {
        titleName: ''
    },
    methods: {
        getTitle: async function() {
            let URL = gURL + '/gpxdata/title'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.drawWindow(result)
            } else {
                let text = await res.text()
                console.log(text)
            }
        }
    },
    created() {
        // this.getTitle()
    }
}
</script>

<style scoped>
.gpx-title {
    width: 800px;
    height: 80px;
    font-size: 32px;
    padding: 20px;
    background-color: #c0c0c0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
</style>
