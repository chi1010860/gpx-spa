<template>
    <div class="nav-bar">
        <div class="btn-sidebar-open" @click="sidebarToggle">&#9776;</div>
        <div>{{ projectName }}</div>
    </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data: function() {
    return {
      _isSidebarOpen: true,
      projectName: "Sample Project"
    };
  },
  methods: {
    sidebarToggle: function() {
      let vm = this;
      vm._isSidebarOpen = !vm._isSidebarOpen;
      vm.$emit("onSidebarToggle", vm._isSidebarOpen);
      console.log(vm._isSidebarOpen);
    }
  },
  mounted() {
    var vm = this;
    vm._isSidebarOpen = vm.isSidebarOpen;
    console.log(vm._isSidebarOpen);
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
  border: 1px solid #aaa;
  text-align: center;
  width: 35px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}

.btn-sidebar-open:hover {
  background: #ddd;
}
</style>