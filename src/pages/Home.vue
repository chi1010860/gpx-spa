<template>
    <section :class="classList">
        <header>
          <nav-bar :is-sidebar-open="isSidebarOpen" v-on:onSidebarToggle="sidebarToggle"></nav-bar>
        </header>
        <nav v-bind:style="{width: sidebarWidth + 'px'}">
          <side-bar></side-bar>
        </nav>
        <main>
          <router-view></router-view>
        </main>
        <footer>2018 IMLAB</footer>
    </section>
</template>

<script>
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default {
  name: "Layout",
  data() {
    return {
      isPage: true,
      isMobile: false,
      isSidebarOpen: true
    };
  },
  computed: {
    classList: function() {
      this.isMobile = window.innerWidth < 500;
      this.isPage = !this.isMobile;

      return {
        page: this.isPage,
        mobile: this.isMobile,
        "sidebar-hidden": !this.isSidebarOpen
      };
    },
    sidebarWidth: function() {
      var vm = this;
      if (vm.isSidebarOpen) {
        if (vm.isMobile) return 300;
        else if (vm.isPage) return 200;
      } else {
        return 0;
      }
    }
  },
  methods: {
    sidebarToggle(newSidebarStatus) {
      var vm = this;
      vm.isSidebarOpen = newSidebarStatus;
    }
  },
  beforeMount() {
    var vm = this;
    vm.isMobile = window.innerWidth < 500;
    vm.isPage = !vm.isMobile;

    if (vm.isPage) {
      vm.isSidebarOpen = true;
    } else {
      vm.isSidebarOpen = false;
    }
    console.log(vm.isSidebarOpen);
  },
  updated() {
    this.sidebarWidth();
  },
  components: {
    NavBar,
    SideBar
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-areas:
    "head head"
    "nav  main"
    "nav  foot";
  grid-template-rows: 4em 10fr 1fr;
  grid-template-columns: 200px 1fr;
  header,
  nav,
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header {
    grid-area: head;
    background-color: #003344;
  }

  nav {
    grid-area: nav;
    background-color: #262626;
    align-items: flex-start;
    padding-top: 1em;
  }

  main {
    grid-area: main;
    background-color: #f2f2f2;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  footer {
    grid-area: foot;
    background-color: #003344;
    padding: 1em;
    color: white;
  }
}

.sidebar-hidden {
  grid-template-columns: 0px 1fr;
}

@media screen and (max-width: 500px) {
  .page {
    grid-template-columns: 0px 1fr;
  }
}

.mobile {
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-areas:
    "head head"
    "main main"
    "foot foot";
  grid-template-rows: 4em 10fr 1fr;
  grid-template-columns: 300px 1fr;
  header,
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header {
    grid-area: head;
    background-color: #003344;
  }

  main {
    grid-area: main;
    background-color: #f2f2f2;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  footer {
    grid-area: foot;
    background-color: #003344;
    padding: 1em;
    color: white;
  }

  nav {
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: 0;
    top: 4em;
    grid-area: nav;
    background-color: #262626;
    display: flex;
    align-items: flex-start;
    padding-top: 1em;
    width: 300px;
  }
}

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>

