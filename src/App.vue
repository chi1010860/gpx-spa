<template>
    <div id="app">
        <vm-loading v-if="isLoading"></vm-loading>
        <router-view></router-view>
    </div>
</template>

<script>
import VmLoading from '@/components/ui/Loading'
export default {
    name: 'App',
    data() {
        return {
            isLoading: true
        }
    },
    components: {
        VmLoading
    },
    created() {
        this.$bus.$on('appLoadingFinished', event => {
            this.isLoading = event.isLoading
        })
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body {
    margin: auto;
}
</style>
