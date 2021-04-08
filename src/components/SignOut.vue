<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignOut',
  methods: {
    ...mapActions(['logout'])
  },
  created() {
    this.logout()
    this.$router.push({ name: 'Home' })
  }
}
</script>
