<template>
    <div class="void">{{msg}}</div>
</template>

<script>
export default {
    data() {
        return {
            msg: ''
        }
    },
    created() {
        this.$bus.$on('showFirstPage', () => {
            this.msg = 'Welcome to GPX'
        })
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
