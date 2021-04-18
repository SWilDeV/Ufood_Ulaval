<template>
  <div id="app">
    <navbar />
    <error-alert />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import ErrorAlert from '@/components/Navigation/ErrorAlert.vue'
import Navbar from '@/components/Navigation/Navbar.vue'

export default {
  name: 'app',
  components: {
    ErrorAlert,
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
