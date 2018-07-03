<template>
    <div class="void">
        Welcome to GPX
    </div>
</template>

<script>
export default {
    name: 'Void',
    methods: {},
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

<style scoped>
.void {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 55px;
    height: 100%;
    background-color: white;
}
</style>
