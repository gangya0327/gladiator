<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button v-permission="['admin']">admin</button>
    <button v-permission="['editor']">editor</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
