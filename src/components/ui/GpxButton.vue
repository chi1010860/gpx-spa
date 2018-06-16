<template>
    <button @click="EnglishSetting">{{ MSG }}</button>
</template>

<script>
export default {
    name: 'GpxButton',
    data() {
        return {
            MSG: 'User Input',
            tagname: '',
            controllink: {
                type: {
                    discrete
                }
            },
            discrete: {
                direct: 'direct',
                reverse: 'reverse',
                toggle: 'toggle',
                reset: 'reset',
                set: 'set'
            }
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
