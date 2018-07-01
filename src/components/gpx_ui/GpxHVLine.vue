<template>
    <div>
        <div class="HVLine-1" :style="{top: this.rect[0][1] + 'px'}"></div>
        <div class="HVLine-2" :style="{top: this.rect[1][1] + 'px'}"></div>
    </div>
</template>

<script>
export default {
    name: 'HVLine',
    props: {
        rect: {
            type: Array,
            default: [[0, 75, 801, 77], [-1, 78, 800, 80]],
            required: true
        }
    },
    methods: {},
    mounted() {}
}
</script>

<style scoped>
.HVLine-1 {
    position: absolute;
    top: 60px;
    width: 798px;
    height: 0px;
    border: 1px solid #888888;
}

.HVLine-2 {
    position: absolute;
    top: 59px;
    width: 798px;
    height: 0px;
    border: 1px solid #ffffff;
}
</style>
