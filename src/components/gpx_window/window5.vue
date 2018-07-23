<template>
    <div>
        <div class="container">
            <div class="row-1">
                <fieldset class="fieldset-0"></fieldset>
            </div>
            <gpx-button v-for="(item, index) in gpxButton" :componentProperties="item" :key="'button' + index"></gpx-button>
            <gpx-input v-for="(item, index) in gpxInput" :componentProperties="item" :key="'input' + index"></gpx-input>
            <gpx-value v-for="(item, index) in gpxValue" :componentProperties="item" :key="'value' + index"></gpx-value>
            <gpx-text v-for="(item, index) in gpxText" :componentProperties="item" :key="'text' + index"></gpx-text>
            <gpx-planar v-for="(item, index) in gpxPlanar" :componentProperties="item" :key="'planar' + index"></gpx-planar>
            <gpx-rectangle v-for="(item, index) in gpxRectangle" :componentProperties="item" :key="'rectangle' + index"></gpx-rectangle>
            <gpx-gauge v-for="(item, index) in gpxGauge" :componentProperties="item" :key="'gauge' + index"></gpx-gauge>
            <gpx-slider v-for="(item, index) in gpxSlider" :componentProperties="item" :key="'slider' + index"></gpx-slider>

            <div class="group-fieldset">
                <fieldset class="fieldset-1"></fieldset>
                <fieldset class="fieldset-2"></fieldset>
                <fieldset class="fieldset-3"></fieldset>
            </div>
        </div>
        <gpx-hvline :rect="hvline"></gpx-hvline>
    </div>
</template>

<script>
import gURL from '@/router/url'
import GpxButton from '@/components/gpx_ui/GpxButton'
import GpxInput from '@/components/gpx_ui/GpxInput'
import GpxValue from '@/components/gpx_ui/GpxValue'
import GpxText from '@/components/gpx_ui/GpxText'
import GpxSlider from '@/components/gpx_ui/GpxSlider'
import GpxPlanar from '@/components/gpx_ui/GpxPlanar'
import GpxRectangle from '@/components/gpx_ui/GpxRectangle'
import GpxGauge from '@/components/gpx_ui/GpxGauge'
import GpxHVLine from '@/components/gpx_ui/GpxHVLine'

export default {
    data() {
        return {
            hvline: [[0, 75, 801, 77], [-1, 78, 800, 80]],
            uTagname: 0,
            gpxObject: {},
            gpxButton: [],
            gpxInput: [],
            gpxValue: [],
            gpxText: [],
            gpxSlider: [],
            gpxPlanar: [],
            gpxRectangle: [],
            gpxGauge: []
        }
    },
    components: {
        'gpx-button': GpxButton,
        'gpx-input': GpxInput,
        'gpx-value': GpxValue,
        'gpx-text': GpxText,
        'gpx-slider': GpxSlider,
        'gpx-planar': GpxPlanar,
        'gpx-rectangle': GpxRectangle,
        'gpx-gauge': GpxGauge,
        'gpx-hvline': GpxHVLine
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
                this.update_A_Bit(this.uTagname, true)

                // Get Objects
                this.gpxObject = pf['gpx:object']
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
                // Get Rectangle
                this.gpxRectangle = this.gpxObject._Rectangle
                    .filter(item => item['control-link'] != null)
                    .filter(item => item['control-link'].length == 1)
                // Get Gauge
                this.gpxGauge.push(this.gpxObject._Ellipse[0])
                this.gpxGauge[0].controlLink = this.gpxObject._HVLine
                    .filter(item => item['control-link'] != null)
                    .find(
                        item =>
                            item['control-link'][0]['link-name'] ==
                            'orientation'
                    )['control-link'][0]
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        update_A_Bit: async function(_tagname, _state) {
            // API
            let URL = gURL + '/winpc32/update_A_Bit'

            // Headers
            let m_headers = new Headers()
            m_headers.append('Accept', 'application/json')
            m_headers.append('Content-Type', 'application/json')

            // Payload
            let data = {
                state: _state,
                tagname: _tagname
            }
            let encodedData = JSON.stringify(data)
            let reqInit = {
                method: 'POST',
                headers: m_headers,
                body: encodedData
            }

            // Request
            let m_request = new Request(URL, reqInit)

            // AJAX
            let res = await fetch(m_request)

            if (res.ok) {
                let result = await res.json()
                console.log(
                    `tagname: ${result.logicName} value: ${result.bitValue}`
                )
            } else {
                let text = await res.text()
                console.warn(text)
            }
        }
    },
    beforeCreate() {
        this.$bus.$emit('appLoadingFinished', {
            isLoading: false
        })
    },
    created() {
        this.getGpxWindow(5)
    },
    beforeDestroy() {
        this.update_A_Bit(this.uTagname, false)
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
