<template>
    <div class="slider-wrapper" :style="styleObject">
        <input :class="classObject" type="range" min="0" max="100" v-model="sliderValue">
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
            styleObject: {},
            // slider
            sliderValue: 0,
            eventName: ''
        }
    },
    computed: {
        controlLink() {
            return this.componentProperties['control-link'][0]
        },
        isRotated() {
            return this.componentProperties.rotate != null ? true : false
        },
        // slider
        classObject() {
            return this.isRotated ? 'slider-vertical' : 'slider-horizontal'
        },
        uTagname() {
            return parseInt(this.controlLink.tagname.match(/\d+/)[0])
        }
    },
    methods: {
        componentInit() {
            this.eventName = 'eventBy_' + this.controlLink.tagname
            let rect = this.componentProperties.rect
            this.styleObject = {
                left: rect[0] + 'px',
                top: rect[1] + 10 + 'px'
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
