<template>
    <div>
        <gpx-title :title-name="sonTitleName"></gpx-title>
        <gpx-button :control-link="controlLink1"></gpx-button>
        <gpx-display :control-link="controlLink1"></gpx-display><br>
        <gpx-button :control-link="controlLink2"></gpx-button>
        <gpx-display :control-link="controlLink2"></gpx-display><br>
        <gpx-button :control-link="controlLink3"></gpx-button>
        <gpx-display :control-link="controlLink3"></gpx-display><br>
        <gpx-button :control-link="controlLink4"></gpx-button>
        <gpx-button :control-link="controlLink5"></gpx-button><br>
        <gpx-display :control-link="controlLink4"></gpx-display>
    </div>
</template>

<script>
import gURL from '@/router/url'
import GpxTitle from '@/components/gpx_ui/GpxTitle'
import GpxButton from '@/components/gpx_ui/GpxButton'
import GpxDisplay from '@/components/gpx_ui/GpxDisplay'

export default {
    props: {
        titleName: {
            type: String,
            default: 'User Input', // TODO: Use AJAX to get the title name
            required: false
        }
    },
    data() {
        return {
            // TODO: Use AJAX to get the controlLink
            sonTitleName: this.titleName,
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
            }
        }
    },
    components: {
        GpxTitle,
        GpxButton,
        GpxDisplay
    },
    methods: {
        winpc32Init: async function() {
            let URL = gURL + '/winpc32/init'

            // AJAX
            let res = await fetch(URL)

            if (res.ok) {
                let result = await res.text()
                console.log(result)
            } else {
                let text = await res.text()
                console.warn(text)
            }
        }
    },
    created() {
        this.winpc32Init()
    }
}
</script>

<style>
</style>
