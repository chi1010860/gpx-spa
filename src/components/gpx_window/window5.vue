<template>
    <div>
        <gpx-title></gpx-title>
        <gpx-hvline :rect="hvline"></gpx-hvline>
    </div>
</template>

<script>
import GpxTitle from '@/components/gpx_ui/GpxTitle'
import GpxHVLine from '@/components/gpx_ui/GpxHVLine'

export default {
    data() {
        return {
            hvline: [[0, 75, 801, 77], [-1, 78, 800, 80]]
        }
    },
    components: {
        GpxTitle,
        'gpx-hvline': GpxHVLine
    },
    beforeCreate() {
        this.$bus.$emit('winpc32Init', {
            isLoading: true
        })
    },
    mounted() {
        // This timeout must be remove in production version
        setTimeout(() => {
            this.$bus.$emit('appLoadingFinished', {
                isLoading: false
            })
            this.$bus.$emit('winpc32Init', {
                isLoading: false
            })
        }, 500)
    }
}
</script>

<style>
</style>
