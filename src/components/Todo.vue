<template>
    <div class="container">
        <div id="myDIV" class="header">
            <h2>Todo List</h2>
            <input type="text" id="myInput" placeholder="Title..." onkeypress="addKeyPress()">
            <span id="btnAdd" onclick="newElement()" class="addBtn">&plus;</span>
        </div>

        <ul id="myUL">
            <li>健身</li>
            <li class="checked">付帳單</li>
            <li>研討會論文</li>
            <li>訂機票</li>
            <li>簽約</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "Todo"
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Lato", sans-serif;
}

/*Todo List*/
* {
  box-sizing: border-box;
}

/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  list-style-type: none;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: "";
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #007399;
  color: white;
}

/* Style the header */
.header {
  background-color: #007399;
  padding: 1px 40px;
  color: white;
  text-align: center;
  font-size: 1em;
  height: 15vh;
}
.header h2 {
  margin: 10px;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  border: none;
  width: 90%;
  padding: 10px;
  float: left;
  font-size: 1em;
}

/* Style the "Add" button */
.addBtn {
  padding: 0.5px;
  width: 10%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 2em;
  cursor: pointer;
  transition: 0.3s;
}

.addBtn:hover {
  background-color: #bbb;
}

@media screen and (max-width: 500px) {
  .header {
    padding: 1px 1px;
  }
  input {
    width: 80%;
  }
  .addBtn {
    width: 20%;
  }
}
</style>
