<template>
    <div class="container">
        <horizontal-bar-gauge></horizontal-bar-gauge>
    </div>
</template>

<script>
import HorizontalBarGauge from "@/components/ui/BarGauge-Horizontal";

export default {
  name: "SampleControl",
  data() {
    return {};
  },
  components: {
    HorizontalBarGauge
  }
};
</script>

<style>
</style>
