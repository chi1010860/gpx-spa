<template>
    <div class="gpx-title">
        <h1 class="font-h1-primary">{{ titleName.h1 }}</h1>
        <h1 class="font-h1-secondary">{{ titleName.h1 }}</h1>
        <h2 class="font-h2-primary">{{ titleName.h2 }}</h2>
        <h2 class="font-h2-secondary">{{ titleName.h2 }}</h2>
    </div>
</template>

<script>
import gURL from '@/router/url'

export default {
    name: 'GpxName',
    data() {
        return {
            keytext: [],
            language: 'original',
            titleName: {
                h1: '',
                h2: ''
            }
        }
    },
    methods: {
        getGpxTitle: async function() {
            let URL = gURL + '/api/gpx'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.getKeyText(result['style-sheet']['key-text'])
                let pf = result.PageFrame.find(
                    item => item['page-title'] == 'Title'
                )
                this.getMessage(pf['gpx:object'].MSG)
            } else {
                let text = await res.text()
                console.log(text)
            }
        },
        getKeyText(data) {
            for (let i in data) {
                this.keytext.push(data[i])
            }
        },
        getMessage(data) {
            let MSG1 = data.find(item => item.text == '2A')
            let h1_index = MSG1.MessageIndex[0].message
            this.titleName.h1 = this.keytext.find(item => item.id == h1_index)[
                'original'
            ]

            let MSG2 = data.find(item => item.text == '30')
            let h2_index = MSG2.MessageIndex[0].message
            this.titleName.h2 = this.keytext.find(item => item.id == h2_index)[
                'original'
            ]
        }
    },
    created() {
        this.getGpxTitle()
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
}
.font-h1-primary {
    position: absolute;
    left: 265px;
    top: 4px;
    width: 224px;
    height: 34px;
    color: #000080;
    z-index: 2;
    font-size: 29px;
    margin: 0;
}
.font-h1-secondary {
    position: absolute;
    left: 266px;
    top: 5px;
    width: 224px;
    height: 34px;
    color: #ffffff;
    z-index: 1;
    font-size: 29px;
    margin: 0;
}
.font-h2-primary {
    position: absolute;
    left: 265px;
    top: 38px;
    width: 224px;
    height: 34px;
    color: #000080;
    z-index: 2;
    font-size: 24px;
    margin: 0;
}
.font-h2-secondary {
    position: absolute;
    left: 266px;
    top: 39px;
    width: 224px;
    height: 34px;
    color: #ffffff;
    z-index: 1;
    font-size: 24px;
    margin: 0;
}
</style>
