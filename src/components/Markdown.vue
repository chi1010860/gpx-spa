<template>
    <div>
        <div id="editor">
            <textarea :value="input" @input="update"></textarea>
            <div v-html="compiledMarkdown"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Markdown",
  data() {
    return {
      input: "# hello \n```\ncar\n```"
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300)
  }
};
</script>

<style lang="scss" scoped>
html,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 80vh;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
  text-align: left;
}

#editor code {
  color: rgb(234, 0, 255);
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}
</style>
