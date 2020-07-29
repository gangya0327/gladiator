<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <breadcrumb />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './component/sidebar'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Sidebar, Breadcrumb
  },
}
</script>

<style lang="scss" scoped>
</style>