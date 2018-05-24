<template>
    <section id="page">
        <header>
          <nav-bar/>
        </header>
        <nav>
          <side-bar/>
        </nav>
        <main>Main area</main>
        <footer>Footer</footer>
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
#page {
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-areas:
    "head head"
    "nav  main"
    "nav  foot";
  grid-template-rows: 4em 1fr auto;
  grid-template-columns: 150px 1fr;
  header,
  nav,
  footer,
  main {
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
    background-color: #64b4ffaf;
  }
  footer {
    grid-area: foot;
    background-color: #8cff9f81;
    padding: 2rem;
  }
}
</style>

