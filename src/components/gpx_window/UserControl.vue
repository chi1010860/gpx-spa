<template>
    <div>
        <div>User Input</div>
        <gpx-button :control-link="controlLink1"></gpx-button>

    </div>
</template>

<script>
import gpxButton from '@/components/ui/GpxButton'

export default {
    name: 'UserInput',
    data() {
        return {
            controlLink1: {
                msg: 'Direct',
                type: 'discrete',
                discrete: 'direct',
                tagname: 'bA0024'
            }
        }
    },
    components: { gpxButton }
}
</script>

<style>
</style>
