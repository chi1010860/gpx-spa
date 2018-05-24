<template>
    <div class="side-bar">
        <a href="/Index.html">Home</a>
        <a href="/todo.html">To Do List</a>
        <a href="app.html">Components</a>
        <a href="/winpc.html">WinPC32</a>
        <a href="#"></a>
        <a style="color: white;">AJAX XML</a>
        <a href="#" id="btnEnglish">English</a>
        <a href="#" id="btnChinese">中文</a>
        <a href="#"></a>
        <a style="color: white;">AJAX JSON</a>
        <a href="#" id="btnEnglishJSON">English</a>
        <a href="#" id="btnChineseJSON">中文</a>
    </div>
</template>

<script>
export default {
  name: "SideBar"
};
</script>

<style scoped>
.side-bar {
  position: fixed;
  top: 4em;
  background-color: #262626;
  overflow-x: hidden;
}

.side-bar a {
  padding: 6px 6px 6px 6px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
}

.side-bar a:hover {
  color: #f1f1f1;
}

.btn-sidebar-close {
  font-size: 24px;
  cursor: pointer;
  text-align: right;
  margin-right: 10px;
}
</style>
