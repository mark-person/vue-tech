<template>
  <div class="hello">

    <div>
      <ul>
        <li>少踩坑</li>
        <li>减少重复劳动</li>

      </ul>
    </div>
    <div style="text-align: center">
      <div style="display: flex;justify-content: center;">
        <span>说明：</span> <img src="../assets/18.png"/><span>表示必须了解</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
