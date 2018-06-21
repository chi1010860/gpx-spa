<template>
    <button @mousedown="fnMousedown()" @mouseup="fnMouseup()">{{ controlLink.msg }}</button>
</template>

<script>
import gURL from '@/router/url'
export default {
    name: 'GpxButton',
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
        uTagname() {
            return parseInt(this.controlLink.tagname.match(/\d+/)[0])
        }
    },
    methods: {
        fnMousedown() {
            if (this.controlLink.type == 'discrete') {
                if (
                    this.controlLink.discrete == 'direct' ||
                    this.controlLink.discrete == 'reverse'
                ) {
                    this.controlLink.state = !this.controlLink.state
                    this.$bus.$emit(this.eventName, {
                        state: this.controlLink.state
                    })
                    this.changeBit_A()
                }
            }
        },
        fnMouseup() {
            if (this.controlLink.type == 'discrete') {
                if (
                    this.controlLink.discrete == 'direct' ||
                    this.controlLink.discrete == 'reverse' ||
                    this.controlLink.discrete == 'toggle'
                ) {
                    this.controlLink.state = !this.controlLink.state
                    this.$bus.$emit(this.eventName, {
                        state: this.controlLink.state
                    })
                    this.changeBit_A()
                } else if (this.controlLink.discrete == 'set') {
                    this.controlLink.state = true
                    this.$bus.$emit(this.eventName, {
                        state: this.controlLink.state
                    })
                    this.changeBit_A()
                } else if (this.controlLink.discrete == 'reset') {
                    this.controlLink.state = false
                    this.$bus.$emit(this.eventName, {
                        state: this.controlLink.state
                    })
                    this.changeBit_A()
                }
            }
        },
        changeBit_A: async function() {
            // API
            let URL = gURL + '/winpc32/changeBit_A'

            // 實例表頭
            let m_headers = new Headers()
            // This one is enough for GET requests
            m_headers.append('Accept', 'application/json')
            // This one sends body
            m_headers.append('Content-Type', 'application/json')

            // 資料酬載 (Payload)
            let data = {
                state: this.controlLink.state,
                tagname: this.uTagname
            }
            let encodedData = JSON.stringify(data)

            let m_Init = {
                method: 'POST',
                headers: m_headers,
                body: encodedData
            }

            // 實例請求
            let m_request = new Request(URL, m_Init)

            // AJAX
            let res = await fetch(m_request)

            if (res.ok) {
                let result = await res.json()
                console.log(result)
            } else {
                let text = await res.text()
                console.warn(text)
            }
        }
    },
    beforeMount() {
        this.changeBit_A()
    }
}
</script>

<style scoped>
button {
    width: 100px;
    height: 50px;
    box-shadow: 1px 2px 0px 0px #899599;
    -moz-box-shadow: 1px 2px 0px 0px #899599;
    -webkit-box-shadow: 1px 2px 0px 0px #899599;
}
button:active {
    position: relative;
    top: 1px;
    box-shadow: 0px 0px 0px 0px #899599;
    -moz-box-shadow: 0px 0px 0px 0px #899599;
    -webkit-box-shadow: 0px 0px 0px 0px #899599;
}
</style>
