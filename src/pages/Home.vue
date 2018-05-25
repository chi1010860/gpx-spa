<template>
    <section class="page">
        <header>
          <nav-bar/>
        </header>
        <nav>
          <side-bar/>
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

@media screen and (max-width: 500px) {
  .page {
    grid-template-columns: 0px 1fr;
  }
  .nav {
    padding-top: 15px;
    width: 0px;
  }
  .nav a {
    font-size: 18px;
  }
}
</style>

