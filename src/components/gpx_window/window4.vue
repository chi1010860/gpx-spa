<template>
    <div>
        <div class="container" id="window4">
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
            <gpx-rectangle v-for="(item, index) in gpxRectangle" :componentProperties="item" :key="'rectangle' + index"></gpx-rectangle>
            <gpx-ellipse v-for="(item, index) in gpxEllipse" :componentProperties="item" :key="'ellipse' + index"></gpx-ellipse>

            <div class="group-fieldset">
                <fieldset class="fieldset-1"></fieldset>
                <fieldset class="fieldset-2"></fieldset>
                <fieldset class="fieldset-3"></fieldset>
            </div>
        </div>
        <gpx-line v-for="(item, index) in gpxLine" :componentProperties="item" :key="'line' + index"></gpx-line>
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
import GpxRectangle from '@/components/gpx_ui/GpxRectangle'
import GpxEllipse from '@/components/gpx_ui/GpxEllipse'
import GpxLine from '@/components/gpx_ui/GpxLine'

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
            gpxPlanar: [],
            gpxLine: [],
            gpxRectangle: [],
            gpxEllipse: []
        }
    },
    components: {
        'gpx-switch-rk': GpxSwitchRk,
        'gpx-button': GpxButton,
        'gpx-input': GpxInput,
        'gpx-value': GpxValue,
        'gpx-text': GpxText,
        'gpx-slider': GpxSlider,
        'gpx-planar': GpxPlanar,
        'gpx-rectangle': GpxRectangle,
        'gpx-ellipse': GpxEllipse,
        'gpx-line': GpxLine
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
                this.gpxLine = this.gpxObject._HVLine
                // Get Slider
                this.gpxSlider = this.gpxObject.VSCROLL || []
                if (this.gpxSlider.length != 0) {
                    for (let i in this.gpxSlider) {
                        this.gpxSlider[i].rotate = 1
                    }
                }
                if (this.gpxObject.HSCROLL != null) {
                    for (let i in this.gpxObject.HSCROLL) {
                        this.gpxSlider.push(this.gpxObject.HSCROLL[i])
                    }
                }
                if (this.gpxSlider.length == 0) {
                    this.gpxSlider = this.gpxObject._Rectangle
                        .filter(item => item['control-link'] != null)
                        .filter(item => item['control-link'].length == 1)
                        .filter(
                            item =>
                                item['control-link'][0]['link-name'] ==
                                    'slider-horizontal' ||
                                item['control-link'][0]['link-name'] ==
                                    'slider-vertical'
                        )
                }
                // Get Planar
                this.gpxPlanar = this.gpxObject._Rectangle
                    .filter(item => item['control-link'] != null)
                    .filter(item => item['control-link'].length == 2)
                    .filter(
                        item =>
                            item['control-link'][0]['link-name'] ==
                            'slider-horizontal'
                    )
                let planar = this.gpxObject._Rectangle.filter(
                    item => item.planar != null
                )
                for (let i in this.gpxPlanar) {
                    this.gpxPlanar[i].planar = planar[i]
                }
                // Get Rectangle
                this.gpxRectangle = this.gpxObject._Rectangle
                    .filter(item => item['control-link'] != null)
                    .filter(item => item['control-link'].length >= 1)
                    .filter(
                        item =>
                            item['control-link'][0]['link-name'].match(
                                /slider/
                            ) == null
                    )
                // Get Ellipse
                this.gpxEllipse = this.gpxObject._Ellipse
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
        this.getGpxWindow(4)
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
    border: inset white;
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
