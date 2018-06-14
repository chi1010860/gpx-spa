<template>
	<div class="container">
		<horizontal-bar-gauge></horizontal-bar-gauge>
		<vertical-bar-gauge></vertical-bar-gauge>
		<full-gauge></full-gauge>
		<half-gauge></half-gauge>
	</div>
</template>

<script>
import HorizontalBarGauge from '@/components/ui/HorizontalBarGauge'
import VerticalBarGauge from '@/components/ui/VerticalBarGauge'
import FullGauge from '@/components/ui/FullGauge'
import HalfGauge from '@/components/ui/HalfGauge'

export default {
    name: 'SampleControl',
    data() {
        return {}
    },
    components: {
        HorizontalBarGauge,
        VerticalBarGauge,
        FullGauge,
        HalfGauge
    }
}
</script>

<style>
</style>
