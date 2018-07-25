<template>
    <div class="container">
        <img type="images/png" src="/static/NCTU.png">
        <div class="vm-loading">
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
            <div class="rect"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    data: function() {
        return {
            username: '',
            password: '',
            remenber: false
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
        width: 300px;
    }
}
.vm-loading {
    z-index: 10000;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    .rect {
        width: 8px;
        height: 36px;
        background-color: #003344;
        display: inline-block;
        margin: 3px;
        animation: animate 1s infinite;
        &:nth-child(2) {
            animation-delay: 0.1s;
        }
        &:nth-child(3) {
            animation-delay: 0.2s;
        }
        &:nth-child(4) {
            animation-delay: 0.3s;
        }
        &:nth-child(5) {
            animation-delay: 0.4s;
        }
        &:nth-child(6) {
            animation-delay: 0.5s;
        }
        &:nth-child(7) {
            animation-delay: 0.6s;
        }
        &:nth-child(8) {
            animation-delay: 0.7s;
        }
        &:nth-child(9) {
            animation-delay: 0.8s;
        }
        &:nth-child(10) {
            animation-delay: 0.9s;
        }
    }
}
@keyframes animate {
    0% {
        background-color: #006688;
    }
    50% {
        transform: scaleY(0);
        background-color: #003344;
    }
    100% {
        background-color: #006688;
    }
}
</style>
