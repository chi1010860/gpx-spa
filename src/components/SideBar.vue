<template>
    <div class="side-bar">
        <router-link class="link" :to="{name: 'Home'}" exact>Home</router-link>
        <router-link class="link" :to="{name: 'Winpc32'}" exact>Winpc32</router-link>
        <router-link class="link" :to="{name: 'SampleControl'}" exact>SampleControl</router-link>
        <router-link class="link" :to="{name: 'UserInput'}" exact>GPX</router-link>
        <a class="link" href="#">-------------------</a>
        <router-link class="link" :to="{name: 'Others'}" exact>Others</router-link>
    </div>
</template>

<script>
export default {
    name: 'SideBar'
}
</script>

<style scoped>
.side-bar {
    position: relative;
    background-color: #262626;
    overflow-x: hidden;
    display: block;
}

.side-bar .link {
    padding: 5px;
    margin-left: 5px;
    text-decoration: none;
    font-size: 1.5em;
    color: #c7c7c7;
    display: flex;
}

.side-bar .link:hover {
    color: #f1f1f1;
}

@media screen and (max-width: 500px) {
    .side-bar {
        padding-top: 15px;
    }
    .side-bar .link {
        font-size: 2em;
        padding: 10px;
        margin-left: 30px;
    }
}
</style>
