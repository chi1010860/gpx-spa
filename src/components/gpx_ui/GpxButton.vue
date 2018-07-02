<template>
    <button @mousedown="fnMousedown" @mouseup="fnMouseup">{{ controlLink.msg }}</button>
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
        fnMousedown(e) {
            this.PB_discrete(this.controlLink, e.type)
        },
        fnMouseup(e) {
            this.PB_discrete(this.controlLink, e.type)
        },
        PB_discrete(controlLink, eventType) {
            if (eventType == 'mousedown') {
                if (controlLink.type == 'discrete') {
                    if (
                        controlLink.discrete == 'direct' ||
                        controlLink.discrete == 'reverse'
                    ) {
                        controlLink.state = !controlLink.state
                        this.$bus.$emit(this.eventName, {
                            state: controlLink.state
                        })
                        this.changeBit_A()
                    }
                }
            } else if (eventType == 'mouseup') {
                if (controlLink.type == 'discrete') {
                    if (
                        controlLink.discrete == 'direct' ||
                        controlLink.discrete == 'reverse' ||
                        controlLink.discrete == 'toggle'
                    ) {
                        controlLink.state = !controlLink.state
                        this.$bus.$emit(this.eventName, {
                            state: controlLink.state
                        })
                        this.changeBit_A()
                    } else if (controlLink.discrete == 'set') {
                        controlLink.state = true
                        this.$bus.$emit(this.eventName, {
                            state: controlLink.state
                        })
                        this.changeBit_A()
                    } else if (controlLink.discrete == 'reset') {
                        controlLink.state = false
                        this.$bus.$emit(this.eventName, {
                            state: controlLink.state
                        })
                        this.changeBit_A()
                    }
                }
            }
        },
        PB_action(controlLink, eventType) {
            if (eventType == 'mousedown') {
                console.log(eventType)
            } else if (eventType == 'mousedown') {
                console.log(eventType)
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
