<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/java">java</router-link> |
      <router-link to="/db">数据库</router-link> |
      <router-link to="/operation">运维</router-link> |
      <router-link to="/python">python</router-link> |
      <router-link to="/other">杂症</router-link>
    </div>
    <router-view/>
  </div>
</template>



<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
