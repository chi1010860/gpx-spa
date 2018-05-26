<template>
    <div class="side-bar">
      <router-link class="link" :to="{name: 'Home'}" exact>Home</router-link>
      <router-link class="link" :to="{path: '/miscellaneous/Todo'}" exact>Todo List</router-link>
      <router-link class="link" :to="{name: 'ProductTester'}" exact>ProductTester</router-link>
      <router-link class="link" :to="{name: 'Markdown'}" exact>Markdown</router-link>
      <router-link class="link" :to="{name: 'Chatroom'}" exact>Chatroom</router-link>
    </div>
</template>

<script>
export default {
  name: "SideBar"
};
</script>

<style scoped>
.side-bar {
  position: absolute;
  top: 5em;
  background-color: #262626;
  overflow-x: hidden;
}

.side-bar .link {
  padding: 5px;
  text-decoration: none;
  font-size: 1.5em;
  color: #c7c7c7;
  display: flex;
}

.side-bar .link:hover {
  color: #f1f1f1;
}

.btn-sidebar-close {
  font-size: 24px;
  cursor: pointer;
  text-align: right;
  margin-right: 10px;
}

@media screen and (max-width: 500px) {
  .side-bar {
    padding-top: 15px;
    width: 0;
  }
  .side-bar .link {
    font-size: 18px;
  }
}
</style>
