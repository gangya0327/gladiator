<template>
  <div class="home">
    <!-- <router-view /> -->

    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <k-form />
    <k-tree />
    <comp />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import KForm from '@/form'
import KTree from '@/tree'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    KForm,
    KTree,
  }
}
</script>
