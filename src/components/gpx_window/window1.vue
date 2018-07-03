<template>
    <div>
        <gpx-title></gpx-title>
        <gpx-clock></gpx-clock>
        <gpx-button :control-link="controlLink1"></gpx-button>
        <gpx-text :control-link="controlLink1"></gpx-text><br>
        <gpx-button :control-link="controlLink2"></gpx-button>
        <gpx-text :control-link="controlLink2"></gpx-text><br>
        <gpx-button :control-link="controlLink3"></gpx-button>
        <gpx-text :control-link="controlLink3"></gpx-text><br>
        <gpx-button :control-link="controlLink4"></gpx-button>
        <gpx-button :control-link="controlLink5"></gpx-button><br>
        <gpx-text :control-link="controlLink4"></gpx-text><br>
        <gpx-hvline :rect="hvline"></gpx-hvline>
    </div>
</template>

<script>
import gURL from '@/router/url'
import GpxTitle from '@/components/gpx_ui/GpxTitle'
import GpxClock from '@/components/gpx_ui/GpxClock'
import GpxButton from '@/components/gpx_ui/GpxButton'
import GpxText from '@/components/gpx_ui/GpxText'
import GpxHVLine from '@/components/gpx_ui/GpxHVLine'

export default {
    data() {
        return {
            // TODO: Use AJAX to get the controlLink
            controlLink1: {
                state: false,
                msg: 'Direct',
                type: 'discrete',
                discrete: 'direct',
                tagname: 'bA0021'
            },
            controlLink2: {
                state: true,
                msg: 'Reverse',
                type: 'discrete',
                discrete: 'reverse',
                tagname: 'bA0022'
            },
            controlLink3: {
                state: false,
                msg: 'Toggle',
                type: 'discrete',
                discrete: 'toggle',
                tagname: 'bA0023'
            },
            controlLink4: {
                state: false,
                msg: 'Set',
                type: 'discrete',
                discrete: 'set',
                tagname: 'bA0024'
            },
            controlLink5: {
                state: false,
                msg: 'Reset',
                type: 'discrete',
                discrete: 'reset',
                tagname: 'bA0024'
            },
            keytext: [],
            language: 'original',
            hvline: [[0, 75, 801, 77], [-1, 78, 800, 80]]
        }
    },
    components: {
        GpxTitle,
        GpxClock,
        GpxButton,
        GpxText,
        'gpx-hvline': GpxHVLine
    },
    methods: {
        winpc32Init: async function() {
            let URL = gURL + '/winpc32/init'
            // AJAX
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.text()
                console.log(result)
                this.$bus.$emit('winpc32Init', {
                    isLoading: false
                })
            } else {
                let text = await res.text()
                console.warn(text)
            }
        },
        getGpxWindow1: async function() {
            let URL = gURL + '/gpxdata/gpx'
            let res = await fetch(URL)
            if (res.ok) {
                let result = await res.json()
                this.getKeyText(result['style-sheet']['key-text'])
                let pf = result.PageFrame.find(
                    item => item['page-title'] == 'Window1'
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
        }
    },
    beforeCreate() {
        this.$bus.$emit('appLoadingFinished', {
            isLoading: false
        })
        this.$bus.$emit('winpc32Init', {
            isLoading: true
        })
    },
    created() {
        this.winpc32Init()
    }
}
</script>

<style>
</style>
