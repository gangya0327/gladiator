<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">
        <svg-icon icon-class="badge" class-name="badge"></svg-icon>
        Home</router-link
      >
      |
      <router-link to="/about/index">
        <svg-icon icon-class="comp" class-name="comp"></svg-icon
        >About</router-link
      >
    </div>

    <svg>
      <use xlink:href="#icon-comp" />
    </svg>
    <svg>
      <use xlink:href="#icon-badge" />
    </svg>
    <svg>
      <use xlink:href="#icon-integer" />
    </svg>

    <router-view />
  </div>
</template>

<script>
// import "@/icons/svg/badge.svg";
// import "@/icons/svg/comp.svg";
// import "@/icons/svg/integer.svg";
export default {};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
