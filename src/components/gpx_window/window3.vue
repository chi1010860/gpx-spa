<template>
    <gpx-title :title-name="titleName"></gpx-title>
</template>

<script>
import GpxTitle from '@/components/gpx_ui/GpxTitle'

export default {
    name: 'window2',
    props: {
        titleName: {
            type: String,
            default: 'Output', // TODO: Use AJAX to get the title name
            required: false
        }
    },
    components: {
        GpxTitle
    }
}
</script>

<style>
</style>
