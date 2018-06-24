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
            default: 'Color Control', // TODO: Use AJAX to get the title name
            required: false
        }
    },
    components: {
        GpxTitle
    },
    beforeCreate() {
        this.$bus.$emit('winpc32Init', {
            isLoading: true
        })
    },
    mounted() {
        // This timeout must be remove in production version
        setTimeout(() => {
            this.$bus.$emit('winpc32Init', {
                isLoading: false
            })
        }, 1000)
    }
}
</script>

<style>
</style>
