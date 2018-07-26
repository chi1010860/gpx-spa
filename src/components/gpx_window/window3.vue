<template>
    <div>
        <div class="container">
            <div class="row-1">
                <fieldset class="fieldset-0"></fieldset>
            </div>
            <gpx-switch-rk v-for="(item, index) in gpxSwitchRk" :componentProperties="item" :key="'switchrk' + index"></gpx-switch-rk>
            <gpx-button v-for="(item, index) in gpxButton" :componentProperties="item" :key="'button' + index"></gpx-button>
            <gpx-input v-for="(item, index) in gpxInput" :componentProperties="item" :key="'input' + index"></gpx-input>
            <gpx-value v-for="(item, index) in gpxValue" :componentProperties="item" :key="'value' + index"></gpx-value>
            <gpx-text v-for="(item, index) in gpxText" :componentProperties="item" :key="'text' + index"></gpx-text>
            <gpx-slider v-for="(item, index) in gpxSlider" :componentProperties="item" :key="'slider' + index"></gpx-slider>
            <gpx-planar v-for="(item, index) in gpxPlanar" :componentProperties="item" :key="'planar' + index"></gpx-planar>
        </div>
    </div>
</template>

<script>
import gURL from '@/router/url'
import GpxSwitchRk from '@/components/gpx_ui/GpxSwitchRk'
import GpxButton from '@/components/gpx_ui/GpxButton'
import GpxInput from '@/components/gpx_ui/GpxInput'
import GpxValue from '@/components/gpx_ui/GpxValue'
import GpxText from '@/components/gpx_ui/GpxText'
import GpxSlider from '@/components/gpx_ui/GpxSlider'
import GpxPlanar from '@/components/gpx_ui/GpxPlanar'

export default {
    data() {
        return {
            uTagname: 0,
            gpxObject: {},
            gpxSwitchRk: [],
            gpxButton: [],
            gpxInput: [],
            gpxValue: [],
            gpxText: [],
            gpxSlider: [],
            gpxPlanar: []
        }
    },
    components: {
        'gpx-switch-rk': GpxSwitchRk,
        'gpx-button': GpxButton,
        'gpx-input': GpxInput,
        'gpx-value': GpxValue,
        'gpx-text': GpxText,
        'gpx-slider': GpxSlider,
        'gpx-planar': GpxPlanar
    },
    methods: {
        getGpxWindow: async function(index) {
            let URL = gURL + '/api/gpx'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                let pf = result.PageFrame.find(
                    item => item['page-title'] == 'Window' + index
                )
                this.uTagname = parseInt(pf.tagname.match(/\d+/)[0])

                // Get Objects
                this.gpxObject = pf['gpx:object']
                this.gpxSwitchRk = this.gpxObject.SWITCHRK
                this.gpxButton = this.gpxObject._Button
                this.gpxInput = this.gpxObject._Text
                    .filter(item => item['control-link'].length != 0)
                    .filter(item => item['control-link'][0]['to-user'] != null)
                // Get Value
                this.gpxValue = this.gpxObject._Text
                    .filter(item => item['control-link'].length != 0)
                    .filter(
                        item =>
                            item['control-link'][0]['link-name'] ==
                                'value-discrete' ||
                            item['control-link'][0]['link-name'] ==
                                'value-analog' ||
                            item['control-link'][0]['link-name'] ==
                                'value-string'
                    )
                this.gpxText = this.gpxObject._Text.filter(
                    item => item['control-link'].length == 0
                )
            } else {
                let text = await res.text()
                console.log(text)
            }
        }
    },
    beforeCreate() {
        this.$bus.$emit('appLoadingFinished', {
            isLoading: false
        })
    },
    created() {
        this.getGpxWindow(3)
    }
}
</script>

<style scoped>
.container {
    display: block;
    position: relative;
    background-color: #c0c0c0;
    width: 100%;
    height: 412px;
}
.group-button {
    width: 100px;
}
.group-text {
    width: 150px;
}
.row-1 {
    width: 100%;
    padding-top: 6px;
    padding-bottom: 15px;
}
.fieldset-0 {
    width: 130px;
    height: 30px;
    background-color: #ccc;
    border: inset;
}
.group-fieldset {
    display: flex;
    height: 86%;
}
.fieldset-1 {
    flex: 1;
}
.fieldset-2 {
    flex: 1;
}
.fieldset-3 {
    flex: 1;
}
</style>
