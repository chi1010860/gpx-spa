<template>
    <div class="slider-wrapper" :style="wrapperStyle">
        <input :class="classObject" type="range" :style="sliderStyle" :min="minValue" :max="maxValue" v-model="sliderValue">
    </div>
</template>

<script>
import gURL from '@/router/url'
export default {
    props: {
        componentProperties: {}
    },
    data() {
        return {
            // wrapper
            wrapperStyle: {},
            // slider
            sliderValue: 0,
            isRotated: false,
            sliderStyle: {}
        }
    },
    computed: {
        controlLink() {
            let temp = this.componentProperties['control-link']
                ? this.componentProperties['control-link'][0]
                : null
            return temp || this.componentProperties
        },
        // slider
        minValue() {
            let tempMin = this.controlLink.range
                ? this.controlLink.range.match(/\d+/g)[0]
                : null
            return tempMin || 0
        },
        maxValue() {
            let tempMax = this.controlLink.range
                ? this.controlLink.range.match(/\d+/g)[1]
                : null
            return tempMax || 100
        },
        classObject() {
            return this.isRotated ? 'slider-vertical' : 'slider-horizontal'
        },
        uTagname() {
            let temp = this.controlLink.tagname
                ? parseInt(this.controlLink.tagname.match(/\d+/)[0])
                : parseInt(this.controlLink.tagname0.match(/\d+/)[0])
            return temp
        },
        eventName() {
            let temp = this.controlLink.tagname || this.controlLink.tagname0
            return 'eventBy_' + temp
        }
    },
    methods: {
        componentInit() {
            let rect = this.componentProperties.rect
            this.wrapperStyle = {
                left: rect[0] + 'px',
                top: rect[1] + 10 + 'px',
                width: rect[2] - rect[0] + 'px'
            }
            this.sliderStyle = {
                width: rect[2] - rect[0] + 'px'
            }
            this.isRotated =
                this.componentProperties.rotate != null ? true : false
            if (this.isRotated == true) {
                this.sliderStyle.width = rect[3] - rect[1] + 'px'
            }
            if (this.sliderStyle.width.match(/\d+/)[0] < 100) {
                this.sliderStyle['transform-origin'] = '29px 29px'
            }
        },
        update_R_Bit: async function() {
            // API
            let URL = gURL + '/winpc32/update_R_Bit'

            // Headers
            let m_headers = new Headers()
            m_headers.append('Accept', 'application/json')
            m_headers.append('Content-Type', 'application/json')

            // Payload
            let data = {
                value: parseInt(this.sliderValue),
                tagname: this.uTagname
            }
            let encodedData = JSON.stringify(data)

            // Request
            let reqInit = {
                method: 'POST',
                headers: m_headers,
                body: encodedData
            }

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
    created() {
        this.componentInit()
        this.update_R_Bit()
    },
    updated() {
        this.$bus.$emit(this.eventName, {
            analogValue: this.sliderValue
        })
        this.update_R_Bit()
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
