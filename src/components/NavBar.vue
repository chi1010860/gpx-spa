<template>
    <div class="nav-bar">
        <div class="btn-sidebar-open" @click="openSidenav()">&#9776;</div>
        <div>{{ projectName }}</div>
    </div>
</template>

<script>
export default {
  name: "NavBar",
  data: function() {
    return {
      isSideBarOpen: true,
      projectName: "Sample Project"
    };
  },
  methods: {
    openSidenav: function() {
      let self = this;
      self.isSideBarOpen = false;
      console.log(self.isSideBarOpen);
    }
  }
};
</script>

<style scoped>
.nav-bar {
  width: 100%;
  background-color: #003344;
  color: white;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  padding-left: 1em;
}

.btn-sidebar-open {
  font-size: 24px;
  cursor: pointer;
  float: left;
}
</style>