<template>
	<button @click="EnglishSetting">{{ MSG }}</button>
</template>

<script>
export default {
    name: 'GpxButton',
    data() {
        return {
            MSG: 'User Input'
        }
    },
    methods: {}
}
</script>

<style scoped>
button {
    width: 100px;
    height: 100px;
}
</style>
