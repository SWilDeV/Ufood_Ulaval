<template>
  <div id="app">
    <navbar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Navbar from '@/components/Navigation/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
</style>
