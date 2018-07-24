<template>
    <div id="app">
        <vm-loading v-if="isLoading"></vm-loading>
        <router-view v-show="!isLoading"></router-view>
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif, '微軟正黑體';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body {
    margin: auto;
}
* {
    /* border-box */
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    /* unselectable */
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
}
</style>
