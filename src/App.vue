<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'app',
  components: {
    'nav-menu': Navigation
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
