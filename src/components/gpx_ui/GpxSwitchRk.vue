<template>
    <label class="switch" :style="styleObject">
        <input type="checkbox" v-model="isChecked">
        <span class="slider round"></span>
    </label>
</template>

<script>
import gURL from '@/router/url'

export default {
    name: 'GpxSwitch',
    props: {
        componentProperties: {}
    },
    data() {
        return {
            isChecked: false,
            styleObject: {}
        }
    },
    computed: {
        uTagname() {
            return parseInt(this.componentProperties.tagname0.match(/\d+/)[0])
        },
        eventName() {
            return 'eventBy_' + this.componentProperties.tagname0
        }
    },
    methods: {
        componentInit() {
            let rect = this.componentProperties.rect
            this.styleObject = {
                left: rect[0] + 'px',
                top: rect[1] + 'px',
                width: rect[2] - rect[0] + 'px',
                height: rect[3] - rect[1] + 'px'
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
                tagname: _tagname,
                state: _state
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
    created() {
        this.componentInit()
    },
    updated() {
        this.$bus.$emit(this.eventName, {
            state: this.isChecked
        })
        this.update_A_Bit(this.uTagname, this.isChecked)
    }
}
</script>

<style scoped>
.switch {
    position: absolute;
    display: flex;
    width: 34px;
    height: 60px;
}

.switch input {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    background-color: rgba(221, 221, 221, 0.774);
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 8px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #007399;
}

input:focus + .slider {
    box-shadow: 0 0 1px #007399;
}

input:checked + .slider:before {
    -webkit-transform: translateY(-28px);
    -ms-transform: translateY(-28px);
    transform: translateY(-28px);
}

.slider.round {
    border-radius: 20px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
