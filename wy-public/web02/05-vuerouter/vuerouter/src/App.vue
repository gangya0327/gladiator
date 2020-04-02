<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    {{mixinText}}
    <p>{{this.test.testa}}</p>
    <ul class="aa">
      <li>01</li>
      <li>02</li>
      <li>03</li>
      <li>04</li>
      <li>05</li>
      <li>06</li>
      <li>07</li>
      <li>08</li>
      <li>09</li>
      <li>10</li>
    </ul>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
