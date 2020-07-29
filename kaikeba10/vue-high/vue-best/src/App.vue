<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <svg-icon class-name="qq" icon-class="qq"></svg-icon>Home
      </router-link>|
      <router-link to="/about">
        <svg-icon class-name="wechat" icon-class="wechat"></svg-icon>About
      </router-link>
      <router-link to="/test">
        <svg-icon class-name="wechat" icon-class="wechat"></svg-icon>Test
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
