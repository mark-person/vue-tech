<style>
  .markdown-body {
    text-align: left;
    width: 50rem;
    margin: auto;
  }
</style>

<template>
  <div>
    <div class="markdown-body" v-html="readmeData"></div>
  </div>
</template>

<script>
  import markdown from '../markdown/operation/operation.md'
  export default {
    name: 'markdown',
    data() {
      return {
        readmeData: this.md2html(markdown)
      }
    }
  }
</script>

